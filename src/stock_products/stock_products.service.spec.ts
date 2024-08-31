import { Test, TestingModule } from '@nestjs/testing';
import { StockProductsService } from './stock_products.service';

describe('StockProductsService', () => {
  let service: StockProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockProductsService],
    }).compile();

    service = module.get<StockProductsService>(StockProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
