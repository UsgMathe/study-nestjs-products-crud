import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @Length(3, 50)
  @ApiProperty({
    minLength: 3,
    maxLength: 50,
    description: 'The name of a category',
  })
  name: string;

  @IsString()
  @Length(3, 250)
  @IsOptional()
  @ApiPropertyOptional({
    minLength: 3,
    maxLength: 250,
    description: 'The description of a category',
  })
  description?: string;
}
