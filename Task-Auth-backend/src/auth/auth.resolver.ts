import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { LoginInput } from "./dto/input/auth-input";
import { UserInput } from "./dto/input/user-input";

import { LoginResponse } from "./dto/output/auth-response";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "../common/guards/gql-auth.guard";

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => LoginResponse)
  async login(@Args("loginData") loginData: LoginInput) {
    return  await this.authService.loginUser(loginData);    
  }

  @Mutation(() => LoginResponse)
  async register(@Args("createUserDto") createUserDto: UserInput) {
    return await this.authService.createUser(createUserDto);
  }
}

