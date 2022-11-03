import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppLogger } from '../shared/logger/logger.service';
import { v4 as uuidv4 } from 'uuid';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
           // clientId: 'users-gateway',
            brokers: ['kafka:9092'],
          },
          consumer: {
            groupId: `users-consumer-${uuidv4()}`,
          },
        },
      },
    ]),
  ],
  providers: [UsersResolver, UsersService, AppLogger],
})
export class UsersModule {}
