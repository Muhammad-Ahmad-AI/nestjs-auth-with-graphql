import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { LoginInput } from "./dto/input/auth-input";
import { UserInput } from "./dto/input/user-input";
import { encodePassword } from "../common/utils/bcrypt";
import { JwtAuthService } from "./jwt-auth.service";
import { UserService } from "./../user/user.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtAuthService: JwtAuthService,
    private readonly userService: UserService
  ) {}

  async createUser(userData: UserInput) {
    if (await this.userService.user(userData.email)) throw new Error("User already exists!");
    const user = await this.prismaService.user.create({
      data: {
        email: userData.email,
        password: encodePassword(userData.password),
        name: userData.name,
      },
    });
    if (!user) throw new Error("There's some issue creating user!");

    const token = await this.jwtAuthService.getJwtToken({
      id: user.id,
      email: user.email,
    });
    return { token: `Bearer ${token}`, user };
  }

  async loginUser(loginData: LoginInput) {    
    const user = await this.userService.user(loginData.email);
    if (!user) throw new Error("No user Exists!");

    const token = await this.jwtAuthService.getJwtToken({
      id: user.id,
      email: user.email,
    });

    return { token: `Bearer ${token}`, user };
  }
}
