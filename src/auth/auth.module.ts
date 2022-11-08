import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppLogger } from '../shared/logger/logger.service';
import { v4 as uuidv4 } from 'uuid';
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
  ],
  controllers: [],
  providers: [AuthService, AuthResolver, AppLogger],
})
export class AuthModule {}
