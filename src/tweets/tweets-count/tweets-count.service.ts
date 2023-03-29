import { Inject, Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/sequelize';
import { Cache } from 'cache-manager';
import { Tweet } from '../entities/tweet.entity';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class TweetsCountService {
  private limit = 10;
  constructor(
    @InjectModel(Tweet)
    private tweetModel: typeof Tweet,
    @Inject('CACHE_MANAGER')
    private cacheManager: Cache,
    @InjectQueue('emails')
    private emailsQueue: Queue,
  ) {}

  @Interval(5000)
  async countTweets() {
    console.log(`searching tweets`);

    let offset = await this.cacheManager.get<number>('tweet-offset');
    offset = offset === undefined ? 0 : offset;

    console.log(`offset: ${offset}`);

    const tweets = await this.tweetModel.findAll({
      offset,
      limit: this.limit,
    });

    console.log(`tweets found: ${tweets.length}`);

    if (tweets.length === this.limit) {
      this.cacheManager.set('tweet-offset', offset + this.limit, 1 * 60 * 10);
      console.log(`found + ${this.limit} tweets`);
      this.emailsQueue.add({ tweets: tweets.map((t) => t.toJSON()) });
    }
  }
}
