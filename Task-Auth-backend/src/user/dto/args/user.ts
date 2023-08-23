import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class user {
  @Field()
  id: number;

  @Field()
  name: string;
}
