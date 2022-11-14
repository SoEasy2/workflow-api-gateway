import { AppLogger } from '../shared/logger/logger.service';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ClientKafka } from '@nestjs/microservices';
import { TOPIC_AUTH_VERIFY_TOKEN } from '../users/constants'
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate, OnModuleInit {
  constructor(
    @Inject('AUTH_SERVICE') private readonly clientAuth: ClientKafka,
    private appLogger: AppLogger,
  ) {
    this.appLogger.setContext(AuthGuard.name);
  }
  async onModuleInit() {
    const topics: Array<string> = [TOPIC_AUTH_VERIFY_TOKEN];
    topics.forEach((topic) => {
      this.clientAuth.subscribeToResponseOf(topic);
    });

    await this.clientAuth.connect();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const gqlReq = ctx.getContext().req;
    const { headers } = gqlReq;
    const { authorization } = headers;
   // return true;
    if (!authorization) {
      this.appLogger.error(
        '[AuthGuard] -> [canActivate] -> [authorization]',
        headers,
      );
      throw new UnauthorizedException();
    }
    const token = authorization.split(' ');
    if (token[0] !== 'Bearer') {
      this.appLogger.error('[AuthGuard] -> [canActivate] -> [token]', token);
      throw new UnauthorizedException();
    }
    try {
      const isValidToken = await new Promise<boolean>((resolve, reject) => {
        this.clientAuth.send(TOPIC_AUTH_VERIFY_TOKEN, token[1]).subscribe({
          next: (response) => resolve(response),
          error: (error) => reject(error),
        });
      });
      if (!isValidToken) {
        this.appLogger.error('[AuthGuard] -> [canActivate] -> [isValidToken]');
        throw new UnauthorizedException();
      }
      gqlReq.user = jwt.decode(token[1]);
      return gqlReq;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}