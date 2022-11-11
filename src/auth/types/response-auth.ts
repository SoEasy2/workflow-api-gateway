import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/type/user';
import { Token } from './token';

@ObjectType()
export class ResponseAuth {
  @Field(() => User, { description: 'Example field (user)' })
  user: User;
  @Field(() => Token, { description: 'Example field (tokens)' })
  tokens: Token;
}
