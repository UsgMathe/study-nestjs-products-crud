import { Test, TestingModule } from '@nestjs/testing';
import { StockProductsController } from './stock_products.controller';
import { StockProductsService } from './stock_products.service';

describe('StockProductsController', () => {
  let controller: StockProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockProductsController],
      providers: [StockProductsService],
    }).compile();

    controller = module.get<StockProductsController>(StockProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
