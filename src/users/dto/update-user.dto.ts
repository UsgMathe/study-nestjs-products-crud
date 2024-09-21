import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString, IsStrongPassword } from 'class-validator';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['passwordConfirmation', 'password'] as const),
) {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'The user password',
    example: 'difficultPassword@123',
  })
  oldPassword?: string;

  @IsOptional()
  @IsStrongPassword()
  @IsString()
  @ApiPropertyOptional({
    description: 'The user password',
    example: 'difficultNewPassword@123',
  })
  newPassword?: string;
}
