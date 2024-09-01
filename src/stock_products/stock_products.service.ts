import { Inject, Injectable } from '@nestjs/common';
import { CreateStockProductDto } from './dto/create-stock_product.dto';
import { UpdateStockProductDto } from './dto/update-stock_product.dto';
import { StockProduct } from './entities/stock_product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class StockProductsService {
  constructor(
    @InjectRepository(StockProduct)
    private readonly stockProductsRepository: Repository<StockProduct>,
    private readonly productsService: ProductsService,
  ) {}

  async create(createStockProductDto: CreateStockProductDto) {
    const product = await this.productsService.findOne(
      createStockProductDto.product_id,
    );

    const stockProduct = this.stockProductsRepository.create({
      ...createStockProductDto,
      product,
    });

    return await this.stockProductsRepository.save(stockProduct);
  }

  findAll() {
    return this.stockProductsRepository.find({ relations: { product: true } });
  }

  findOne(id: number) {
    return `This action returns a #${id} stockProduct`;
  }

  update(id: number, updateStockProductDto: UpdateStockProductDto) {
    return `This action updates a #${id} stockProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} stockProduct`;
  }
}
