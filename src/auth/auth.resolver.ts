import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../users/type/user';
import { CreateUserInput } from '../users/dto/create-user.input';
import { HttpException, HttpStatus } from '@nestjs/common';
import { AppLogger } from '../shared/logger/logger.service';
import { AuthService } from './auth.service';
import { RegisterUserInput } from './dto/register-user.input';
import { ResponseAuth } from './types/response-auth';

@Resolver('auth')
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private appLogger: AppLogger,
  ) {
    this.appLogger.setContext(AuthResolver.name);
  }
  @Mutation(() => ResponseAuth)
  async registerUser(
    @Args('registerUserInput') registerUserInput: RegisterUserInput,
  ) {
    try {
      this.appLogger.log('[AuthService] -> [registerUser]');
      return await this.authService.registerUser(registerUserInput);
    } catch (err) {
      console.log("ERROR", err);
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
