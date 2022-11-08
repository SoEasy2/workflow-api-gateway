import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka, RpcException } from '@nestjs/microservices';
import {
  TOPIC_USER_CREATE,
  TOPIC_USER_REMOVE,
  TOPIC_USER_UPDATE,
} from './constants';
import { User } from './type/user';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @Inject('USERS_SERVICE') private readonly clientUser: ClientKafka,
  ) {}
  async onModuleInit() {
    const topics: Array<string> = [
      TOPIC_USER_CREATE,
      TOPIC_USER_UPDATE,
      TOPIC_USER_REMOVE,
    ];
    topics.forEach((topic) => {
      this.clientUser.subscribeToResponseOf(topic);
    });

    await this.clientUser.connect();
  }

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    try {
      return new Promise((resolve, reject) => {
        this.clientUser
          .send(TOPIC_USER_CREATE, { ...createUserInput })
          .subscribe({
            next: (response) => {
              console.log('RESPONSE', response);
              resolve(response);
            },
            error: (error) => {
              console.log('ERORR');
              reject(error);
            },
          });
      });
    } catch (e) {
      throw new RpcException(e);
    }
  }

  async updateUser(updateUserInput: UpdateUserInput): Promise<User> {
    try {
      return new Promise((resolve, reject) => {
        this.clientUser
          .send(TOPIC_USER_UPDATE, { ...updateUserInput })
          .subscribe({
            next: (response) => resolve(response),
            error: (error) => reject(error),
          });
      });
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async removeUser(id: string): Promise<User> {
    try {
      return new Promise((resolve, reject) => {
        this.clientUser.send(TOPIC_USER_REMOVE, id).subscribe({
          next: (response) => resolve(response),
          error: (error) => reject(error),
        });
      });
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
