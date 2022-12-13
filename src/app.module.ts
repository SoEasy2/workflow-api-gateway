import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Context } from 'apollo-server-core';
import { AppResolver } from './app.resolver';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpErrorFilter } from './shared/http-error.filter';
import { LoggingInterceptor } from './shared/logging.interceptor';
import { LoggerModule } from './shared/logger/logger.module';
import { AuthModule } from './auth/auth.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'auth',
            brokers: ['kafka:9092'],
          },
          consumer: {
            groupId: `auth-consumer-${uuidv4()}`,
          },
        },
      },
    ]),
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground:
        process.env.NODE_ENV === 'production'
          ? false
          : { settings: { 'request.credentials': 'include' } },
      introspection: true,
      autoSchemaFile: './src/schema.graphql',
      sortSchema: true,
      buildSchemaOptions: {
        numberScalarMode: 'integer',
      },
      installSubscriptionHandlers: true,
      subscriptions: {
        'graphql-ws': {
          path: '/graphql',
          onConnect: (context: Context<any>) => {
            return {
              connectionParams: context.connectionParams,
            };
          },
        },
      },
      context: ({ req, res, payload, connectionParams }) => {
        return { req, res, payload, connectionParams };
      },
      bodyParserConfig: {
        limit: 100000000,
      },
      cors: {
        origin: true,
        credentials: true,
      },
    }),
    UsersModule,
    LoggerModule,
    AuthModule,
    CompanyModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AppResolver,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
