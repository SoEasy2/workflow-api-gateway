import { Field, ObjectType } from '@nestjs/graphql';
import { StepRegistration } from '../constants/stepRegistration';
import { Company } from '../../company/type/company';
import { TypeRegistration } from '../constants/typeRegistration';
import { StepConnect } from '../constants/stepConnect';
import { Languages } from '../constants/languages';

@ObjectType()
export class User {
  @Field(() => String, { description: 'Example field (uuid)' })
  id: string;

  @Field(() => String, { description: 'Example field (email)' })
  email: string;

  @Field(() => String, { description: 'Example field (phone)' })
  phone: string;

  @Field(() => String, { description: 'Example field (code email)' })
  codeEmail: string;

  @Field(() => String, { description: 'Example field (send code date)' })
  sendCodeDate: Date;

  @Field(() => String, { description: 'Example field (current step)' })
  stepRegistration: StepRegistration | StepConnect;

  @Field(() => Company, { nullable: true })
  currentCompany?: Company | string;

  @Field(() => String, {
    description: 'Example field (password)',
    nullable: true,
  })
  password?: string;

  @Field(() => String, { nullable: true, description: 'language' })
  language: Languages;

  @Field(() => String, { description: 'Example field (salt)' })
  salt?: string;

  @Field(() => String, {
    description: 'ISO date string',
    nullable: true,
  })
  createdAt: Date;

  @Field(() => String, { description: 'username', nullable: true })
  username?: string;

  @Field(() => String, { description: 'type registration', nullable: false })
  typeRegistration?: TypeRegistration;

  @Field(() => String, {
    description: 'ISO date',
    nullable: true,
  })
  updatedAt: Date;
  @Field(() => String, {
    description: 'ISO date',
    nullable: true,
  })
  birthday?: Date;
  @Field(() => String, { description: 'address', nullable: true })
  address?: string;
  @Field(() => String, { description: 'description', nullable: true })
  description?: string;
  @Field(() => String, { description: 'Manager', nullable: true })
  manager?: string | null;
  @Field(() => String, { description: 'Department', nullable: true })
  department?: string | null;
}
