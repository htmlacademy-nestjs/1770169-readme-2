import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongooseOptions } from '@project/lib/shared/helpers';

@Module({
  imports: [
    MongooseModule.forRootAsync(getMongooseOptions('notificationsMongo'))
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
