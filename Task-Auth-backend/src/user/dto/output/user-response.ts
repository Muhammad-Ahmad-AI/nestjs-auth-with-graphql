import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class userResponse {
  @Field()
  name: string;
}
