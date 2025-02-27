import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { ConfigApiGatewayModule } from '@project/lib/config/api-gateway';

import { PublicationsController } from './publications.controller';
import { CustomersController } from './customers.controller';
import { HTTP_CLIENT_MAX_REDIRECTS, HTTP_CLIENT_TIMEOUT } from './app.constant';
import { CheckAuthGuard } from './guards/check-auth.guard';

@Module({
  imports: [
    HttpModule.register({
      timeout: HTTP_CLIENT_TIMEOUT,
      maxRedirects: HTTP_CLIENT_MAX_REDIRECTS
    }),
    ConfigApiGatewayModule
  ],
  controllers: [PublicationsController, CustomersController],
  providers: [CheckAuthGuard],
})
export class AppModule {}
