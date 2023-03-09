import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpErrorFilter } from './shared/http-error.filter';
import { AppLogger } from './shared/logger/logger.service';
//import helmet from 'helmet';


async function bootstrap() {
  const app: NestExpressApplication =
    await NestFactory.create<NestExpressApplication>(AppModule);

  //app.useGlobalFilters(new CustomRpcExceptionFilter());

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useLogger(new AppLogger());

  // app.use(helmet());

  app.use(cookieParser());

  app.use(bodyParser.json({ limit: '50mb' }));

  app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));

  app.useGlobalFilters(new HttpErrorFilter());

  app.enableShutdownHooks();

  await app.listen(4000, () => {
    console.log('GATEWAY IS RUNNING ON PORT 4000');
  });
}
bootstrap();
