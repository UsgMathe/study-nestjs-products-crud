import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateStockProductDto } from './dto/create-stock_product.dto';
import { UpdateStockProductDto } from './dto/update-stock_product.dto';
import { StockProduct } from './entities/stock_product.entity';
import { StockProductsService } from './stock_products.service';

@ApiTags('Stock Products')
@ApiBearerAuth('AUTH_KEY')
@Controller('stock-products')
export class StockProductsController {
  constructor(private readonly stockProductsService: StockProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Adds a product to stock' })
  @ApiCreatedResponse({
    description: 'Product successfully added to stock',
    type: StockProduct,
  })
  create(@Body() createStockProductDto: CreateStockProductDto) {
    return this.stockProductsService.create(createStockProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products in stock' })
  @ApiOkResponse({
    description: 'List of products in stock',
    type: [StockProduct],
  })
  findAll() {
    return this.stockProductsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find product in stock by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of product in stock to return',
    example: 1,
  })
  @ApiOkResponse({ description: 'Found product in stock', type: StockProduct })
  @ApiNotFoundResponse({
    description: 'Stock Product not found',
    example: {
      message: 'Stock Product with ID 1 was not found',
      error: 'Not Found',
      statusCode: 404,
    },
  })
  findOne(@Param('id') id: string) {
    return this.stockProductsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing product in stock' })
  @ApiParam({
    name: 'id',
    description: 'ID of an existing product in stock',
    example: 1,
  })
  @ApiOkResponse({ type: StockProduct })
  @ApiNotFoundResponse({
    description: 'Stock Product not found',
    example: {
      message: 'Stock Product with ID 1 was not found',
      error: 'Not Found',
      statusCode: 404,
    },
  })
  update(
    @Param('id') id: string,
    @Body() updateStockProductDto: UpdateStockProductDto,
  ) {
    return this.stockProductsService.update(+id, updateStockProductDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Remove a existing product from stock' })
  @ApiParam({
    name: 'id',
    description: 'ID of an existing product in stock',
    example: 1,
  })
  @ApiNoContentResponse({
    description: 'Product successfully removed from stock',
  })
  @ApiNotFoundResponse({
    description: 'Stock Product not found',
    example: {
      message: 'Stock Product with ID 1 was not found',
      error: 'Not Found',
      statusCode: 404,
    },
  })
  remove(@Param('id') id: string) {
    return this.stockProductsService.remove(+id);
  }
}
