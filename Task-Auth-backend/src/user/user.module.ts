import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
