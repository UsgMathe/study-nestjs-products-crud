import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { In, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private readonly categoryService: CategoriesService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const { categories_ids } = createProductDto;

    const existingCategories =
      await this.categoryService.validateCategoriesIds(categories_ids);

    const product = this.productsRepository.create({
      ...createProductDto,
      categories: existingCategories,
    });

    return this.productsRepository.save(product);
  }

  async findAll() {
    return this.productsRepository.find({ relations: { categories: true } });
  }

  async findOne(id: number) {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: { categories: true },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} was not found`);
    }

    return this.productsRepository.findOne({
      where: { id },
      relations: { categories: true },
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
