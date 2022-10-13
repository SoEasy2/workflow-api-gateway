import { Query, Resolver, Subscription } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

@Resolver()
export class AppResolver {
  @Query(() => String)
  async hello(): Promise<string> {
    return 'Good';
  }
}
