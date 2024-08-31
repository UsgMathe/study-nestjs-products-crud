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

  create(createStockProductDto: CreateStockProductDto) {
    return 'This action adds a new stockProduct';
  }

  findAll() {
    return `This action returns all stockProducts`;
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
