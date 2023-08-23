import { Field, ObjectType } from "@nestjs/graphql";
import { isNullableType } from "graphql";

@ObjectType()
export class TaskResponse {
  @Field()
  id?: number;

  @Field({ nullable: true }) 
  name?: string;
}
