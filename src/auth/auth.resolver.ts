import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { AppLogger } from '../shared/logger/logger.service';
import { AuthService } from './auth.service';
import { RegisterUserInput } from './dto/register-user.input';
import { ResponseAuth } from './types/response-auth';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../users/type/user';
import { GetRefreshTokenDecoratorGraphql } from '../decorators/get-refresh-token.decorator.graphql';
import { DetailsInput } from './dto/details.input';
import { CurrentUserDecoratorGraphql } from '../decorators/current-user.decorator.graphql';
import { LoginUserInput } from './dto/login-user.input';

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
  ): Promise<User> {
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
    @CurrentUserDecoratorGraphql() user: Partial<User>,
  ): Promise<User> {
    try {
      this.appLogger.log('[AuthService] -> [verificationUser]');
      const { email } = user;
      return await this.authService.verificationUser({ email, emailCode });
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  @Mutation(() => User)
  @UseGuards(AuthGuard)
  async details(
    @Args('detailsInput') detailsInput: DetailsInput,
    @CurrentUserDecoratorGraphql() user: Partial<User>,
  ): Promise<User> {
    try {
      this.appLogger.log('[AuthService] -> [details]');
      const { email, id } = user;
      const { user: userDto, company } = detailsInput;
      const dto: DetailsInput = {
        user: {
          ...userDto,
          email,
          id,
        },
        company,
      };
      return await this.authService.details(dto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  @Mutation(() => ResponseAuth)
  async refresh(@GetRefreshTokenDecoratorGraphql() refreshToken: string): Promise<ResponseAuth> {
    try {
      this.appLogger.log('[AuthService] -> [refresh]');
      return await this.authService.refresh(refreshToken);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  @Mutation(() => User)
  @UseGuards(AuthGuard)
  async resendVerificationCode(@CurrentUserDecoratorGraphql() user: Partial<User>): Promise<User> {
    try {
      this.appLogger.log('[AuthService] -> [resendVerificationCode]');
      const { email } = user;
      return await this.authService.resendVerificationCode(email);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  @Mutation(() => ResponseAuth)
  async login(
      @Args('loginUserInput') loginUserInput: LoginUserInput,
  ): Promise<ResponseAuth> {
    try {
      this.appLogger.log('[AuthService] -> [login]');
      return await this.authService.login(loginUserInput)
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
