import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from './type/user';
import { CreateUserInput } from './dto/create-user.input';
import { UsersService } from './users.service';
import { Inject, OnModuleInit } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User || null)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    const a = await this.usersService.addPost();
    console.log('A', a);
    return null;
  }
}
