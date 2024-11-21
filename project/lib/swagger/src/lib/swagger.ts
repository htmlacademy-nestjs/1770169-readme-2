import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function createSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('The «Readme» project.')
    .setDescription('Description of the API server')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('spec', app, document)
}
