import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthService {
  constructor(private readonly jwtService: JwtService) {}

  async getJwtToken(payload: any, expiration = '1h') {
    return this.jwtService.sign(payload, {
      expiresIn: expiration,
    });
  }
}
