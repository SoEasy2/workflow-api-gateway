import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => String, { description: 'Example field (uuid)' })
  id: string;
  @Field(() => String, { description: 'Example field (email)' })
  email: string;
  @Field(() => String, { description: 'Example field (phone)' })
  phone: string;
  @Field(() => String, {
    description: 'Example field (password)',
    nullable: true,
  })
  password?: string;
  @Field(() => String, {
    description: 'ISO date string',
    nullable: true,
  })
  createdAt: Date;
  @Field(() => String, {
    description: 'ISO date string',
    nullable: true,
  })
  updatedAt: Date;
}
