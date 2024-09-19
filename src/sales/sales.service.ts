import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Sale } from './entities/sale.entity';
import { ProductsService } from 'src/products/products.service';
import { StockProductsService } from 'src/stock_products/stock_products.service';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private readonly salesRepository: Repository<Sale>,
    private readonly productsService: ProductsService,
    private readonly stockProductsService: StockProductsService,
  ) {}

  async create(createSaleDto: CreateSaleDto) {
    const { saleItems } = createSaleDto;
    const stockProductsIds = saleItems.map((item) => item.stock_product_id);

    await this.stockProductsService.validateStockProductsIds(stockProductsIds);

    const sales = await Promise.all(
      saleItems.map(async (saleItem) => {
        const stockProduct = await this.stockProductsService.findOne(
          saleItem.stock_product_id,
        );

        return this.salesRepository.create({
          product: stockProduct.product,
          amount: saleItem.quantity,
          price: stockProduct.price,
        });
      }),
    );

    return await this.salesRepository.save(sales);
  }

  findAll() {
    return this.salesRepository.find({
      relations: {
        product: {
          categories: true,
        },
      },
    });
  }

  async findOne(id: number) {
    const foundSale = await this.salesRepository.findOne({
      where: { id },
      relations: {
        product: {
          categories: true,
        },
      },
    });

    if (!foundSale) {
      throw new NotFoundException(`Sale with ID ${id} was not found`);
    }
    return foundSale;
  }

  async update(id: number, updateSaleDto: UpdateSaleDto) {
    await this.findOne(id);

    const { saleItems } = updateSaleDto;

    const stockProductsIds = saleItems.map((item) => item.stock_product_id);

    await this.stockProductsService.validateStockProductsIds(stockProductsIds);

    return `This action updates a #${id} sale`;
  }

  remove(id: number) {
    return `This action removes a #${id} sale`;
  }
}
