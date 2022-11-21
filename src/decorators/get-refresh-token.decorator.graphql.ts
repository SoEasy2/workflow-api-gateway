import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GetRefreshTokenDecoratorGraphql = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
        const ctx = GqlExecutionContext.create(context);
        const gqlReq = ctx.getContext().req;
        const { headers } = gqlReq;
        const { authorization } = headers;
        if (!authorization) {
            throw new BadRequestException('No authorization header');
        }
        const token = authorization.split(' ');
        if (token.length < 2 && token[0] !== 'Bearer') {
            throw new BadRequestException('No bearer token');
        }
        return token[1];
    },
);