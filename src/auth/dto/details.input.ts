import { ArgsType, Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { User } from '../../users/type/user';
import { Company } from '../../company/type/company';
import { EmployeesCount } from '../../company/constants/employesCount';

@ObjectType()
@InputType()
class DetailsUser extends PartialType(User) {
    @Field(() => String, { nullable: true })
    id?: string;
    @Field(() => String, { nullable: true })
    email?: string
    @Field(() => String)
    username: string;
    @Field(() => String)
    password: string;
}

@ObjectType()
@InputType()
class DetailsCompany extends PartialType(Company) {
    @Field(() => String)
    name: string;
    @Field(() => String)
    amountOfEmployees: EmployeesCount;
}

@InputType()
export class DetailsInput {
    @Field(() => DetailsUser, { description: 'Example field (test@gmail.com)' })
    user: DetailsUser;
    @Field(() => DetailsCompany, { description: 'Example field (+33333333)' })
    company: DetailsCompany;
}
