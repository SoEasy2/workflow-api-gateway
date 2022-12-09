import { ArgsType, Field, InputType, PartialType } from '@nestjs/graphql';
import { User } from '../../users/type/user';
import { Company } from '../../company/type/company';

@InputType()
@ArgsType()
export class DetailsInput{
    @Field(() => PartialType(User), { description: 'Example field (test@gmail.com)' })
    user: Partial<User>;
    @Field(() => PartialType(Company), { description: 'Example field (+33333333)' })
    company: Partial<Company>;
}
