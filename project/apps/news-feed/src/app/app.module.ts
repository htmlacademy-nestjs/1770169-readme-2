import { Module } from '@nestjs/common';

import { ConfigNewsFeedModule } from '@project/lib/config/news-feed';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigNewsFeedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
