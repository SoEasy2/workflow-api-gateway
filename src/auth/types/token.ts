import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Token {
  @Field(() => String, { description: 'Example field (refreshToken)' })
  accessToken: string;
  @Field(() => String, { description: 'Example field (accessToken)' })
  refreshToken: string;
}
