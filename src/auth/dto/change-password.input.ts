import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType()
@ArgsType()
export class ChangePasswordInput {
  @Field(() => String, { description: 'password' })
  password: string;
  @Field(() => String, { description: 'newPassword' })
  newPassword: string;
}
