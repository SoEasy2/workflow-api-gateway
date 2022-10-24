import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { TOPIC_USER_CREATE } from './constants';
import { User } from './type/user';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UsersService implements OnModuleInit{
  constructor(
      @Inject('USERS_SERVICE') private readonly billingClient: ClientKafka,
  ) {}
  async onModuleInit() {
    this.billingClient.subscribeToResponseOf('user.create');
    await this.billingClient.connect();
  }

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const test =  await this.billingClient.send('user.create', { ...createUserInput }).toPromise();
    console.log('TEST', test)
    return test;
  }
}
