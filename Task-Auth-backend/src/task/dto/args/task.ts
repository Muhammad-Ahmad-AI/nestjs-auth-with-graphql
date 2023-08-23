import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Task {
  @Field()
  id: number;

  @Field()
  name: string;
}
