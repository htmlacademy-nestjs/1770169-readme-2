import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ENV_FILE_PATH } from './config-notifications.constant';
import notificationsMongoConfig from './mongo/notifications-mongo.config';
import notificationsRabbitConfig from './rabbit/notifications-rabbit.config';
import notificationsAppConfig from './app/notifications-app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [notificationsMongoConfig, notificationsRabbitConfig, notificationsAppConfig],
      envFilePath: ENV_FILE_PATH
    })
  ]
})
export class NotificationsConfigModule {}
