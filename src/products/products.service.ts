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

    const foundCategories =
      await this.categoryService.validateCategoriesIds(categories_ids);

    const product = this.productsRepository.create({
      ...createProductDto,
      categories: foundCategories,
    });

    return this.productsRepository.save(product);
  }

  async findAll() {
    return this.productsRepository.find({ relations: { categories: true } });
  }

  async findAllByIds(ids: number[]) {
    return this.productsRepository.find({
      relations: { categories: true },
      where: { id: In(ids) },
    });
  }

  async findOne(id: number) {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: { categories: true },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} was not found`);
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const foundProduct = await this.findOne(id);

    const { categories_ids } = updateProductDto;

    if (categories_ids) {
      const foundCategories =
        await this.categoryService.validateCategoriesIds(categories_ids);

      await this.productsRepository.save({
        ...foundProduct,
        ...updateProductDto,
        categories: foundCategories,
      });
      return this.findOne(id);
    }

    await this.productsRepository.save({
      ...foundProduct,
      ...updateProductDto,
    });

    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.productsRepository.delete({ id });
    return;
  }

  async validateProductsIds(ids: number[]) {
    const foundProducts = await this.findAllByIds(ids);

    const foundProductsIds = foundProducts.map((product) => product.id);

    if (foundProducts.length < ids.length) {
      const notFountProductsIds = ids.filter(
        (productId) => !foundProductsIds.includes(productId),
      );

      if (notFountProductsIds.length > 1) {
        throw new NotFoundException(
          `Products with IDs ${notFountProductsIds.join(', ')} not found`,
        );
      }

      throw new NotFoundException(
        `Product with ID ${notFountProductsIds[0]} not found`,
      );
    }

    return foundProducts;
  }
}
