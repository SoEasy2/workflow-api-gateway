import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
  TOPIC_AUTH_REFRESH,
  TOPIC_AUTH_REGISTER,
  TOPIC_AUTH_VERIFICATION,
} from '../users/constants';
import { RegisterUserInput } from './dto/register-user.input';
import { User } from '../users/type/user';
import { VerificationUserInput } from './dto/verification-user.input';
import { ResponseAuth } from './types/response-auth';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @Inject('AUTH_SERVICE') private readonly clientAuth: ClientKafka,
  ) {}
  async onModuleInit() {
    const topics: Array<string> = [
      TOPIC_AUTH_REGISTER,
      TOPIC_AUTH_VERIFICATION,
      TOPIC_AUTH_REFRESH
    ];
    topics.forEach((topic) => {
      this.clientAuth.subscribeToResponseOf(topic);
    });

    await this.clientAuth.connect();
  }
  registerUser(registerUserInput: RegisterUserInput): Promise<User> {
    try {
      return new Promise((resolve, reject) => {
        this.clientAuth
          .send(TOPIC_AUTH_REGISTER, { ...registerUserInput })
          .subscribe({
            next: (response) => resolve(response),
            error: (error) => reject(error),
          });
      });
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  verificationUser(dto: VerificationUserInput): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.clientAuth.send(TOPIC_AUTH_VERIFICATION, { ...dto }).subscribe({
        next: (response) => resolve(response),
        error: (error) => reject(error),
      });
    });
  }
  refresh(refreshToken: string): Promise<ResponseAuth> {
    return new Promise<ResponseAuth>((resolve, reject) => {
      this.clientAuth.send(TOPIC_AUTH_REFRESH, refreshToken ).subscribe({
        next: (response) => resolve(response),
        error: (error) => reject(error),
      });
    })
  }
}
