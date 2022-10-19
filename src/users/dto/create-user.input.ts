import { InputType, Field, ArgsType } from '@nestjs/graphql';
import { User } from '../type/user';


@InputType()
@ArgsType()
export class CreateUserInput implements Partial<User> {
  @Field(() => String, { description: 'Example field (test@gmail.com)' })
  email: string;
  @Field(() => String, { description: 'Example field (+33333333)' })
  phone: string;
  @Field(() => String, { description: 'Example field (test)', nullable: true })
  password?: string;
}
