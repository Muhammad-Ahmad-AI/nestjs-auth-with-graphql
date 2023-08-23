import { User } from '../args/user';
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class LoginResponse {
  @Field()
  token: string;

  @Field(() => User)
  user: User;
}
