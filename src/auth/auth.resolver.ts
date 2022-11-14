import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { AppLogger } from '../shared/logger/logger.service';
import { AuthService } from './auth.service';
import { RegisterUserInput } from './dto/register-user.input';
import { ResponseAuth } from './types/response-auth';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUserDecoratorGraphql } from '../decorators/current-user.decorator.graphql';

@Resolver('auth')
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private appLogger: AppLogger,
  ) {
    this.appLogger.setContext(AuthResolver.name);
  }
  @UseGuards(AuthGuard)
  @Mutation(() => ResponseAuth)
  async registerUser(
    @Args('registerUserInput') registerUserInput: RegisterUserInput,
    @CurrentUserDecoratorGraphql() user,
  ) {
    try {
      this.appLogger.log('[AuthService] -> [registerUser]');
      console.log("USER", user)
      return await this.authService.registerUser(registerUserInput);
    } catch (err) {
      console.log('ERROR', err);
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
