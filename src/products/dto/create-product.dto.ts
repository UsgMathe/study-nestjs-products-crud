import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @Length(3, 50)
  @ApiProperty({
    description: 'The name of a product',
    minLength: 3,
    maxLength: 50,
    example: 'Microwave',
  })
  name: string;

  @IsString()
  @Length(3, 250)
  @IsOptional()
  @ApiPropertyOptional({
    minLength: 3,
    maxLength: 250,
    description: 'The description of a product',
    example:
      'Small oven that uses electromagnetic waves to heat or cook food quickly',
  })
  description?: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @ApiProperty({
    description: 'The list of categories ids',
    type: [Number],
    example: [1],
  })
  categories_ids: number[];
}
