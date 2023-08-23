import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { User } from "@prisma/client";
import { UnauthorizedException, BadRequestException } from "@nestjs/common";
import { comparePassword } from "../common/utils/bcrypt";

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async user(email: any) { 
    return await this.prismaService.user.findFirst({
      where: { email },
    });
  }

  validatePassword(pwd: string, dbPwd: string): boolean {
    const isValidPwd = pwd && comparePassword(pwd, dbPwd);
    if (!isValidPwd) throw new BadRequestException("Invalid username or password");

    return true;
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.prismaService.user.findFirst({
      where: { email: email },
    });
    if (!user) throw new UnauthorizedException("Invalid username or password");
    
    const isValidPwd = this.validatePassword(password, user?.password);
    if (isValidPwd) {
      return user;
    }

    throw new UnauthorizedException("Invalid username or password");
  }
}
