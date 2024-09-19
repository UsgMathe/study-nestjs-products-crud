import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StockProductsService } from 'src/stock_products/stock_products.service';
import { Repository } from 'typeorm';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Sale } from './entities/sale.entity';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private readonly salesRepository: Repository<Sale>,
    private readonly stockProductsService: StockProductsService,
  ) {}

  async create(createSaleDto: CreateSaleDto) {
    const { saleItems } = createSaleDto;
    const stockProductsIds = saleItems.map((item) => item.stock_product_id);

    const foundStockProducts =
      await this.stockProductsService.validateStockProductsIds(
        stockProductsIds,
      );

    const invalidSaleItemsQuantity = saleItems.filter((saleItem) => {
      const foundStockProduct = foundStockProducts.find(
        (stockProduct) => stockProduct.id == saleItem.stock_product_id,
      );

      return saleItem.quantity > foundStockProduct.quantity;
    });

    if (invalidSaleItemsQuantity.length) {
      const invalidItemsIds = invalidSaleItemsQuantity.map(
        (invalidSaleItem) => invalidSaleItem.stock_product_id,
      );

      if (invalidItemsIds.length > 1) {
        throw new BadRequestException(
          `Insufficient stock for products IDs: [${invalidItemsIds.join(', ')}].`,
        );
      }
      const invalidSaleItem = invalidSaleItemsQuantity[0];

      const foundStockProduct = foundStockProducts.find(
        (stockProduct) => stockProduct.id == invalidSaleItem.stock_product_id,
      );

      throw new BadRequestException(
        `Insufficient stock for product ID: ${invalidSaleItem.stock_product_id}. Available: ${foundStockProduct.quantity}, Requested: ${invalidSaleItem.quantity}.`,
      );
    }

    const sales = await Promise.all(
      saleItems.map(async (saleItem) => {
        const stockProduct = await this.stockProductsService.findOne(
          saleItem.stock_product_id,
        );

        await this.stockProductsService.update(stockProduct.id, {
          quantity: stockProduct.quantity - saleItem.quantity,
        });
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

  async remove(id: number) {
    await this.findOne(id);

    await this.salesRepository.delete({ id });
    return;
  }
}
