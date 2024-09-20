import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The username email',
    minLength: 3,
    maxLength: 50,
    example: 'UsgMathe',
  })
  @Length(3, 50)
  username: string;

  @IsEmail()
  @ApiProperty({
    description: 'The user email',
    example: 'usgmathe@email.com',
  })
  email: string;

  @IsStrongPassword()
  @IsString()
  @ApiProperty({
    description: 'The user password',
    example: 'difficultPassword@123',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The user password',
    example: 'difficultPassword@123',
  })
  passwordConfirmation: string;
}
