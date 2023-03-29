<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="100" alt="Nest Logo" /></a>
</p>

## Description

Nest with TypeScript repository to study more about the framework. 

A CRON task reads every 5 seconds the amount of new tweets created in the database from the offset stored in the CACHE. If the number of new tweets found is equal to the established limit, the system will add them to a QUEUE and a JOB will "send" an email with the tweets found.

## Installation

```bash
$ docker-compose up
```

## Stay in touch

- Author - [Rafael Bertuzzi](https://www.linkedin.com/in/rafaelbertuzzi/)

