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

    const foundCategory = await this.categoriesRepository.findOneBy({
      name: normalizedCategoryName,
    });

    if (foundCategory) {
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
    const foundCategory = await this.categoriesRepository.findOneBy({ id });

    if (!foundCategory) {
      throw new NotFoundException(`Category with ID ${id} was not found`);
    }

    return foundCategory;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const foundCategory = await this.findOne(id);

    if (!foundCategory) {
      throw new NotFoundException(`Category with ID ${id} was not found`);
    }

    const category = this.categoriesRepository.create(updateCategoryDto);
    await this.categoriesRepository.update({ id }, category);

    return await this.findOne(id);
  }

  async remove(id: number) {
    const foundCategory = await this.findOne(id);

    if (!foundCategory) {
      throw new NotFoundException(`Category with ID ${id} was not found`);
    }

    await this.categoriesRepository.delete({ id });
    return;
  }

  async validateCategoriesIds(ids: number[]) {
    const foundCategories = await this.findAllByIds(ids);

    const foundCategoriesIds = foundCategories.map(
      (foundCategory) => foundCategory.id,
    );

    if (foundCategories.length != ids.length) {
      const notFoundCategoriesIds = ids.filter(
        (categoryId) => !foundCategoriesIds.includes(categoryId),
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

    return foundCategories;
  }
}
