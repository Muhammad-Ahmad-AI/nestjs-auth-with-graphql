import { HttpStatus, Module } from "@nestjs/common";
import { AppResolver } from "./app.resolver";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { GraphQLError, GraphQLFormattedError } from "graphql";
import { TaskModule } from "./task/task.module";
import { UserModule } from "./user/user.module";
import { APP_FILTER } from "@nestjs/core";
import { GlobalErrorInterceptor } from "./error.middleware";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "schema.gql",
      sortSchema: true,
      playground: true,
      introspection: true,
      fieldResolverEnhancers: ["interceptors"],
      formatError: (error: GraphQLError | any) => {
        // GraphQLError type
        // => format errors
        console.log(
          JSON.stringify(error),
          error?.extensions?.response?.message
        );
        const graphQLFormattedError: GraphQLFormattedError & {
          status: HttpStatus;
        } = {
          status:
            error?.extensions?.response?.statusCode ||
            HttpStatus.INTERNAL_SERVER_ERROR,
          message:
            error?.extensions?.response?.message ||
            error?.message ||
            "Something went wrong",
        };
        return graphQLFormattedError;
      },
    }),

    AuthModule,
    UserModule,
    PrismaModule,
    TaskModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalErrorInterceptor,
    },
    AppResolver,
  ],
})
export class AppModule {}
