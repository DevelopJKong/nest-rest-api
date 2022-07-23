import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as express from 'express';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const PORT = 3000;
  const logger = morgan("dev");
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('pug');
  app.use(logger);
  app.use('/image', express.static('image'));
  app.use('/uploads', express.static('uploads'));
  app.use('/static', express.static('assets'));

  await app.listen(PORT);
  //console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Application is running on: 🎁 http://localhost:${PORT}`);
}
bootstrap();
