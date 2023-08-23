import { Resolver, Args, Query } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { userResponse } from "./dto/output/user-response";
import { GqlAuthGuard } from "../common/guards/gql-auth.guard";

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => userResponse)
  async user(@Args("email") email: string) {
    return this.userService.user(email);
  }
}