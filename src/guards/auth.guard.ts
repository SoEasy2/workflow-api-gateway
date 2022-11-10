import { Observable } from 'rxjs';
import { AppLogger } from '../shared/logger/logger.service';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private appLogger: AppLogger,
    ) {
        this.appLogger.setContext(AuthGuard.name);
    }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const gqlReq = ctx.getContext().req;
        const { headers } = gqlReq;
        const { authorization } = headers;
        if (!authorization) {
            this.appLogger.error('[AuthGuard] -> [canActivate] -> [authorization]', headers);
            throw new UnauthorizedException();
        }
        return true
  }
}