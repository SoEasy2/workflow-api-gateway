import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from './type/user';
import { CreateUserInput } from './dto/create-user.input';
import { Inject, OnModuleInit } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { TOPIC_USER_CREATE } from './constants';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver implements OnModuleInit{
  constructor(
      @Inject('USERS_SERVICE') private readonly billingClient: ClientKafka,
      private readonly usersService: UsersService,
  ) {}
  async onModuleInit() {
    this.billingClient.subscribeToResponseOf('user.create');
    await this.billingClient.connect();
  }

  @Mutation(() => User || null)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.billingClient.send('user.create', { ...createUserInput });
  }
}
