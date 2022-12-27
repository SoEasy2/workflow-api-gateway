import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from './type/user';
import { CreateUserInput } from './dto/create-user.input';
import { UsersService } from './users.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { AppLogger } from '../shared/logger/logger.service';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver('user')
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private appLogger: AppLogger,
  ) {
    this.appLogger.setContext(UsersResolver.name);
  }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    try {
      this.appLogger.log('[UsersResolver] -> [createUser]');
      return await this.usersService.createUser(createUserInput);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  @Mutation(() => User)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    try {
      this.appLogger.log('[UsersResolver] -> [updateUser]');
      return await this.usersService.updateUser(updateUserInput);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  @Mutation(() => String)
  async removeUser(@Args('id') id: string) {
    try {
      this.appLogger.log('[UsersResolver] -> [removeUser]');
      return await this.usersService.removeUser(id);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
