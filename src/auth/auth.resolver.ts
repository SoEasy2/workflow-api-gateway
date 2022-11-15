import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { AppLogger } from '../shared/logger/logger.service';
import { AuthService } from './auth.service';
import { RegisterUserInput } from './dto/register-user.input';
import { ResponseAuth } from './types/response-auth';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUserDecoratorGraphql } from '../decorators/current-user.decorator.graphql';
import { User } from '../users/type/user';

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
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  @Mutation(() => User)
  @UseGuards(AuthGuard)
  async verificationUser(
    @Args('emailCode', { type: () => String }) emailCode: string,
    @CurrentUserDecoratorGraphql() user,
  ): Promise<User> {
    try {
      this.appLogger.log('[AuthService] -> [verificationUser]');
      const { email } = user;
      return await this.authService.verificationUser({ email, emailCode });
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
