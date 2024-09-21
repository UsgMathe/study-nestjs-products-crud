import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthLogInDto } from './dto/auth-logIn.dto';
import { Public } from './decorators/public.decorator';

@ApiTags('Auth')
@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @Public()
  @ApiOperation({ summary: 'Logs user into the system' })
  @ApiOkResponse({
    description: 'User logged in successfully',
    example: {
      access_token: 'token',
    },
  })
  @ApiUnauthorizedResponse({
    example: {
      message: 'Unauthorized',
      statusCode: 401,
    },
  })
  async logIn(@Body() user: AuthLogInDto) {
    return await this.authService.logIn(user);
  }
}
