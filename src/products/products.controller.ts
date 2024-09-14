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
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@ApiBearerAuth('AUTH_KEY')
@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiCreatedResponse({
    description: 'Product successfully created',
    type: Product,
  })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiOkResponse({ description: 'List of products', type: [Product] })
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'ID of product to return' })
  @ApiOperation({ summary: 'Find product by ID' })
  @ApiOkResponse({ description: 'Found product', type: Product })
  @ApiNotFoundResponse({
    description: 'Product not found',
    schema: {
      example: {
        message: 'Product with ID 1 was not found',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing product' })
  @ApiParam({ name: 'id', description: 'ID of an existing product' })
  @ApiBody({ type: UpdateProductDto })
  @ApiOkResponse({ description: 'Updated category', type: Product })
  @ApiNotFoundResponse({
    description: 'Product not found',
    schema: {
      example: {
        message: 'Product with ID 1 was not found',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Deletes a existing product' })
  @ApiParam({ name: 'id', description: 'ID of an existing product' })
  @ApiNoContentResponse({ description: 'Product successfully deleted' })
  @ApiNotFoundResponse({
    description: 'Product not found',
    schema: {
      example: {
        message: 'Product with ID 1 was not found',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
