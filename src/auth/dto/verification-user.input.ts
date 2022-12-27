import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType()
@ArgsType()
export class VerificationUserInput {
  @Field(() => String, { description: 'Example field (test@gmail.com)' })
  email: string;
  @Field(() => String, { description: 'Example field (+33333333)' })
  emailCode: string;
}
