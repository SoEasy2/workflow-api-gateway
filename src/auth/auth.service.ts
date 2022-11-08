import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { TOPIC_AUTH_REGISTER } from '../users/constants';
import { RegisterUserInput } from './dto/register-user.input';
import { User } from '../users/type/user';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @Inject('AUTH_SERVICE') private readonly clientUser: ClientKafka,
  ) {}
  async onModuleInit() {
    const topics: Array<string> = [TOPIC_AUTH_REGISTER];
    topics.forEach((topic) => {
      this.clientUser.subscribeToResponseOf(topic);
    });

    await this.clientUser.connect();
  }
  async registerUser(registerUserInput: RegisterUserInput): Promise<User> {
    try {
      return new Promise((resolve, reject) => {
        this.clientUser
          .send(TOPIC_AUTH_REGISTER, { ...registerUserInput })
          .subscribe({
            next: (response) => resolve(response),
            error: (error) => {
              console.log('ERROR', error);
              reject(error);
            },
          });
      });
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
