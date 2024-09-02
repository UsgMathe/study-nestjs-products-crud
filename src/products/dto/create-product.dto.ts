import { IsArray, IsNumber, IsString, Length } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @Length(3, 50)
  name: string;

  @IsArray()
  @IsNumber({}, { each: true })
  categories_ids: number[];
}
