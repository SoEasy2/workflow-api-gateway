import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { User } from '../../users/type/user';

@ObjectType()
@InputType()
export class DetailsByCodeCompanyInput extends PartialType(User) {
    @Field(() => String, { description: 'username' })
    username: string

    @Field(() => String, { description: 'email' })
    email: string;

    @Field(() => String, { description: 'phone' })
    phone: string;

    @Field(() => String, { description: 'password' })
    password: string;

    @Field(() => String, { description: 'current company' })
    currentCompany: string;
}