import { Injectable } from '@nestjs/common';
import { CreateStockProductDto } from './dto/create-stock_product.dto';
import { UpdateStockProductDto } from './dto/update-stock_product.dto';

@Injectable()
export class StockProductsService {
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
