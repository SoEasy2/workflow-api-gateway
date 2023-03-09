import { InputType, Field, PartialType } from '@nestjs/graphql';
import { User } from '../type/user';

@InputType()
export class UpdateUserInput extends PartialType(User) {
  @Field(() => String, {
    description: 'Example field (test@gmail.com)',
    nullable: true,
  })
  id?: string;
  @Field(() => String, {
    description: 'Example field (test@gmail.com)',
    nullable: true,
  })
  email?: string;
  @Field(() => String, {
    description: 'Example field (+33333333)',
    nullable: true,
  })
  phone?: string;
  @Field(() => Date, { description: 'Date birthday', nullable: true })
  birthday?: Date | null;
  @Field(() => String, { description: 'Manager id', nullable: true })
  manager?: string | null;
  @Field(() => String, { description: 'Department', nullable: true })
  department?: string | null;
  @Field(() => String, { description: 'Address', nullable: true })
  address?: string | null;
  @Field(() => String, { description: 'Description', nullable: true })
  description: string | null;
}
