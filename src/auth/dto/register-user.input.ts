import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { User } from '../../users/type/user';

@InputType()
@ArgsType()
export class RegisterUserInput implements Partial<User> {
  @Field(() => String, { description: 'Example field (test@gmail.com)' })
  email: string;
  @Field(() => String, { description: 'Example field (+33333333)' })
  phone: string;
  @Field(() => String, { description: 'Example field (test)', nullable: true })
  password?: string;
}
