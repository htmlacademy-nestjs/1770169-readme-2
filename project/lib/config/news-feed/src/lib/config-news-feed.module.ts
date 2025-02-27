import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { ENV_FILE_PATH } from './news-feed.constant';
import { NewsFeedAppConfig } from './app/news-feed-app.config';
import { NewsFeedMongoConfig } from './mongo/news-feed-mongo.config';
import { NewsFeedRabbitConfig } from './rabbit/news-feed-rabbit.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [
        NewsFeedAppConfig,
        NewsFeedMongoConfig,
        NewsFeedRabbitConfig
      ],
      envFilePath: ENV_FILE_PATH
    })
  ],
  providers: [],
  exports: []
})
export class ConfigNewsFeedModule {}
