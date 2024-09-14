import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString, Length } from 'class-validator';

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

  @IsArray()
  @IsNumber({}, { each: true })
  @ApiProperty({
    description: 'The list of categories ids',
    type: [Number],
    example: [1],
  })
  categories_ids: number[];
}
