import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsString } from 'class-validator';

@ApiTags('Auth')
export class AuthLogInDto {
  @IsString()
  @ApiProperty({
    description: 'User username or email',
    example: 'usgmathe@email.com',
  })
  identifier: string;

  @IsString()
  @ApiProperty({
    description: 'User password',
    example: 'difficultPassword@123',
  })
  password: string;
}
