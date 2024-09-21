import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { AuthLogInDto } from './dto/auth-logIn.dto';

@Injectable()
export class AuthService {
  private readonly saltRounds = 10;

  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string) {
    return await bcrypt.hash(password, this.saltRounds);
  }

  async comparePasswords(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }

  async logIn(user: AuthLogInDto) {
    const { identifier, password } = user;

    try {
    } catch {}
    const foundUser = await this.usersService
      .findOne({
        where: [{ username: identifier }, { email: identifier }],
      })
      .catch(() => {
        throw new UnauthorizedException();
      });

    if (!foundUser) throw new UnauthorizedException();

    if (!this.comparePasswords(password, foundUser.password)) {
      throw new UnauthorizedException();
    }

    const payload = {
      id: foundUser.id,
      username: foundUser.username,
      email: foundUser.email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }
}
