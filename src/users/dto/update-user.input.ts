import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String, { description: 'Example field (test@gmail.com)' })
  id: string;
  @Field(() => String, { description: 'Example field (test@gmail.com)' })
  email: string;
  @Field(() => String, { description: 'Example field (+33333333)' })
  phone: string;
  @Field(() => String, { description: 'Example field (test)', nullable: true })
  password?: string;
}
