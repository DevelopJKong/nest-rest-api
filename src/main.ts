import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as pg from 'pg';
import * as session from 'express-session';
import * as connectPg from 'connect-pg-simple';
import * as express from 'express';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const PORT = 3000;
  const logger = morgan('dev');
  const dbConfig = {
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    database: process.env.DB_NAME,
  };
  const pgPool = new pg.Pool(dbConfig);
  const pgSession = connectPg(session);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('pug');

  app.use(logger);
  app.use(
    session({
      store: new pgSession({
        pool:pgPool,
        tableName:"session"
      }),
      secret: process.env.COOKIE_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 3600000,
      },
    }),
  );
  
  const localsMiddleware = (req:express.Request,res:express.Response,next:express.NextFunction) => {
    //@ts-ignore
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    //@ts-ignore
    res.locals.loggedInUser = req.session.user || {};
    res.locals.shopPidCode = process.env.SHOP_PID_CODE;
    res.locals.devDomain = "http://localhost:5050",
    res.locals.domain = "https://aboutcafeboard.herokuapp.com"
    console.log(res.locals);
    next();
}

  app.use(localsMiddleware);
  app.use('/image', express.static('image'));
  app.use('/uploads', express.static('uploads'));
  app.use('/static', express.static('assets'));

  await app.listen(PORT);
  //console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Application is running on: 🎁 http://localhost:${PORT}`);
}
bootstrap();
