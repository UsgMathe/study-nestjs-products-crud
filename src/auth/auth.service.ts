import {
  Injectable,
  NotFoundException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthLogInDto } from './dto/auth-logIn.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersService: UsersService,
  ) {}
  private readonly saltRounds = 10;

  async hashPassword(password: string) {
    return await bcrypt.hash(password, this.saltRounds);
  }

  async comparePasswords(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }

  async logIn(user: AuthLogInDto) {
    console.log('AAAAAAA', user);
    const { identifier, password } = user;

    const foundUser = await this.usersService.findOne({
      where: { email: identifier },
    });

    if (!this.comparePasswords(password, foundUser.password)) {
      throw new UnauthorizedException();
    }
  }
}
