import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthLogInDto } from './dto/auth-logIn.dto';

@ApiTags('Auth')
@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async logIn(@Body() user: AuthLogInDto) {
    return await this.authService.logIn(user);
  }
}
