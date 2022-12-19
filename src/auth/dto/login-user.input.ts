import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType()
@ArgsType()
export class LoginUserInput {
    @Field(() => String, { description: 'login' })
    login: string;
    @Field(() => String, { description: 'password' })
    password: string;
}
