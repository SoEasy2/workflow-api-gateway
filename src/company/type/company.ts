import { EmployeesCount } from '../constants/employesCount';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Company {
  @Field(() => String, { description: 'Example field (uuid)' })
  id: string;
  @Field(() => String, { description: 'Example field (name)' })
  name: string;
  @Field(() => String, { description: 'Example field (uuid)' })
  user: string;
  @Field(() => [String], { description: 'Example field (uuid array)' })
  targetUser: Array<string>;
  @Field(() => EmployeesCount, {
    description: 'Example field (employees count)',
  })
  amountOfEmployees: EmployeesCount;
  @Field(() => Date, { description: 'Example field (Date)' })
  createdAt: Date;
  @Field(() => Date, { description: 'Example field (Date)' })
  updatedAt: Date;
}
