import { Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from 'src/auth/auth.guard';


@UseGuards(GraphqlAuthGuard)
@Resolver()
export class UserResolver {
  @Query(() => String)
  loggedIn(): string {
    console.log('you are successfully logged in');
    return 'you are successfully logged in';
  }
}
