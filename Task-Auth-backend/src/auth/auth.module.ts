import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtAuthService } from './jwt-auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './../common/strategy/jwt.strategy';
import { UserModule } from './../user/user.module';
import { LocalStrategy } from './../common/strategy/local.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [
    AuthResolver,
    AuthService,
    JwtAuthService,
    JwtStrategy,
    LocalStrategy,
  ],
})
export class AuthModule {}
