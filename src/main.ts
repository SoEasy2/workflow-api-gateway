import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app: NestExpressApplication =
    await NestFactory.create<NestExpressApplication>(
      AppModule
    );

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.use(cookieParser());

  app.use(bodyParser.json({ limit: '50mb' }));

  app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));

  app.useLogger(app.get(Logger));

  await app.listen(4000, () => {
    console.log('GATEWAY IS RUNNING ON PORT 4000');
  });
}
bootstrap();
