import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name : "USERS_SERVICE",
        transport : Transport.KAFKA,
        options : {
          client : {
            clientId : 'users',
            brokers : ['kafka:9092']
          },
          consumer : {
            groupId : 'users-consumer'
          }
        }
      }
    ])
  ],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
