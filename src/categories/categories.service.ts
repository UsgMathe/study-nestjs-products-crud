import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const normalizedCategoryName = createCategoryDto.name.toLowerCase().trim();

    const category = this.categoriesRepository.create({
      ...createCategoryDto,
      name: normalizedCategoryName,
    });

    const existingCategory = await this.categoriesRepository.findOneBy({
      name: normalizedCategoryName,
    });

    if (existingCategory) {
      throw new ConflictException(
        `Category with name '${createCategoryDto.name}' already exists`,
      );
    }

    return this.categoriesRepository.save(category);
  }

  findAll() {
    return this.categoriesRepository.find();
  }

  async findAllByIds(ids: number[]) {
    return await this.categoriesRepository.find({
      where: { id: In(ids) },
    });
  }

  async findOne(id: number) {
    const existingCategory = await this.categoriesRepository.findOneBy({ id });

    if (!existingCategory) {
      throw new NotFoundException(`Category with ID ${id} was not found`);
    }

    return existingCategory;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const existingCategory = await this.findOne(id);

    if (!existingCategory) {
      throw new NotFoundException(`Category with ID ${id} was not found`);
    }

    const category = this.categoriesRepository.create(updateCategoryDto);
    await this.categoriesRepository.update({ id }, category);

    return await this.findOne(id);
  }

  async remove(id: number) {
    const existingCategory = await this.findOne(id);

    if (!existingCategory) {
      throw new NotFoundException(`Category with ID ${id} was not found`);
    }

    await this.categoriesRepository.delete({ id });
    return;
  }

  async validateCategoriesIds(ids: number[]) {
    const existingCategories = await this.findAllByIds(ids);

    const existingCategoriesIds = existingCategories.map(
      (existingCategory) => existingCategory.id,
    );

    if (existingCategories.length != ids.length) {
      const notFoundCategoriesIds = ids.filter(
        (categoryId) => !existingCategoriesIds.includes(categoryId),
      );

      if (notFoundCategoriesIds.length > 1) {
        throw new NotFoundException(
          `Categories with IDs ${notFoundCategoriesIds.join(', ')} not found`,
        );
      }

      throw new NotFoundException(
        `Category with ID ${notFoundCategoriesIds[0]} not found`,
      );
    }
  }
}
