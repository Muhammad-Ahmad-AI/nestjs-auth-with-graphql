import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class UserInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  password: string;
}
