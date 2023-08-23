import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, IsNumber } from "class-validator";

@InputType()
export class userInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;
}
