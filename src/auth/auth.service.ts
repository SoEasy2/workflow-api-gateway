import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
  TOPIC_AUTH_CHANGE_PASSWORD,
  TOPIC_AUTH_DETAILS,
  TOPIC_AUTH_DETAILS_BY_CODE_COMPANY,
  TOPIC_AUTH_LOGIN,
  TOPIC_AUTH_REFRESH,
  TOPIC_AUTH_REGISTER,
  TOPIC_AUTH_REGISTER_BY_CODE,
  TOPIC_AUTH_VERIFICATION,
  TOPIC_AUTH_VERIFICATION_CONNECT,
  TOPIC_AUTH_VERIFICATION_RESEND,
} from '../users/constants';
import { RegisterUserInput } from './dto/register-user.input';
import { User } from '../users/type/user';
import { VerificationUserInput } from './dto/verification-user.input';
import { ResponseAuth } from './types/response-auth';
import { DetailsInput } from './dto/details.input';
import { LoginUserInput } from './dto/login-user.input';
import { DetailsByCodeCompanyInput } from './dto/details-by-code-company.input';
import { ChangePasswordInput } from './dto/change-password.input';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @Inject('AUTH_SERVICE') private readonly clientAuth: ClientKafka,
  ) {}
  async onModuleInit() {
    const topics: Array<string> = [
      TOPIC_AUTH_REGISTER,
      TOPIC_AUTH_VERIFICATION,
      TOPIC_AUTH_REFRESH,
      TOPIC_AUTH_VERIFICATION_RESEND,
      TOPIC_AUTH_DETAILS,
      TOPIC_AUTH_LOGIN,
      TOPIC_AUTH_REGISTER_BY_CODE,
      TOPIC_AUTH_DETAILS_BY_CODE_COMPANY,
      TOPIC_AUTH_VERIFICATION_CONNECT,
      TOPIC_AUTH_CHANGE_PASSWORD,
    ];
    topics.forEach((topic) => {
      this.clientAuth.subscribeToResponseOf(topic);
    });

    await this.clientAuth.connect();
  }
  registerUser(registerUserInput: RegisterUserInput): Promise<User> {
    return new Promise((resolve, reject) => {
      this.clientAuth
        .send(TOPIC_AUTH_REGISTER, { ...registerUserInput })
        .subscribe({
          next: (response) => resolve(response),
          error: (error) => reject(error),
        });
    });
  }
  verificationUser(dto: VerificationUserInput): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.clientAuth.send(TOPIC_AUTH_VERIFICATION, { ...dto }).subscribe({
        next: (response) => resolve(response),
        error: (error) => reject(error),
      });
    });
  }

  verificationConnectUser(dto: VerificationUserInput): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.clientAuth
        .send(TOPIC_AUTH_VERIFICATION_CONNECT, { ...dto })
        .subscribe({
          next: (response) => resolve(response),
          error: (error) => reject(error),
        });
    });
  }

  refresh(refreshToken: string): Promise<ResponseAuth> {
    return new Promise<ResponseAuth>((resolve, reject) => {
      this.clientAuth.send(TOPIC_AUTH_REFRESH, refreshToken).subscribe({
        next: (response) => resolve(response),
        error: (error) => reject(error),
      });
    });
  }

  resendVerificationCode(email: string): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.clientAuth.send(TOPIC_AUTH_VERIFICATION_RESEND, email).subscribe({
        next: (response) => resolve(response),
        error: (error) => reject(error),
      });
    });
  }

  details(detailsInput: DetailsInput): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.clientAuth.send(TOPIC_AUTH_DETAILS, detailsInput).subscribe({
        next: (response) => resolve(response),
        error: (error) => reject(error),
      });
    });
  }

  login(loginUserInput: LoginUserInput): Promise<ResponseAuth> {
    return new Promise<ResponseAuth>((resolve, reject) => {
      this.clientAuth.send(TOPIC_AUTH_LOGIN, loginUserInput).subscribe({
        next: (response) => resolve(response),
        error: (error) => reject(error),
      });
    });
  }

  registerByCodeCompany(code: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.clientAuth.send(TOPIC_AUTH_REGISTER_BY_CODE, code).subscribe({
        next: (response) => resolve(response),
        error: (error) => reject(error),
      });
    });
  }

  detailsByCodeCompany(
    detailsByCodeCompanyInput: DetailsByCodeCompanyInput,
  ): Promise<ResponseAuth> {
    return new Promise<ResponseAuth>((resolve, reject) => {
      this.clientAuth
        .send(TOPIC_AUTH_DETAILS_BY_CODE_COMPANY, detailsByCodeCompanyInput)
        .subscribe({
          next: (response) => resolve(response),
          error: (error) => reject(error),
        });
    });
  }

  changePasswordUser(
    changePasswordInput: ChangePasswordInput,
    email: string,
    id: string,
  ): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.clientAuth
        .send(TOPIC_AUTH_CHANGE_PASSWORD, {
          ...changePasswordInput,
          email,
          id,
        })
        .subscribe({
          next: (response) => resolve(response),
          error: (error) => reject(error),
        });
    });
  }
}
