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
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Sale } from './entities/sale.entity';
import { SalesService } from './sales.service';

@ApiTags('Sales')
@ApiBearerAuth('AUTH_KEY')
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  @ApiOperation({ summary: 'Register a product sale' })
  @ApiCreatedResponse({
    description: 'Product sale successfully registered',
    type: [Sale],
  })
  create(@Body() createSaleDto: CreateSaleDto): Promise<Sale[]> {
    return this.salesService.create(createSaleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all product sales' })
  @ApiOkResponse({ description: 'List of product sales', type: [Sale] })
  findAll() {
    return this.salesService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'ID of product sale', example: 1 })
  @ApiOperation({ summary: 'Find product by ID' })
  @ApiOkResponse({ description: 'Found product sale', type: Sale })
  @ApiNotFoundResponse({
    description: 'Sale not found',
    schema: {
      example: {
        message: 'Sale with ID 1 was not found',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  findOne(@Param('id') id: string) {
    return this.salesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing product sale' })
  @ApiParam({
    name: 'id',
    description: 'ID of an existing product sale',
    example: 1,
  })
  @ApiBody({ type: UpdateSaleDto })
  @ApiOkResponse({ description: 'Updated sale', type: Sale })
  @ApiNotFoundResponse({
    description: 'Sale not found',
    schema: {
      example: {
        message: 'Sale with ID 1 was not found',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  update(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto) {
    return this.salesService.update(+id, updateSaleDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Deletes a existing sale' })
  @ApiParam({
    name: 'id',
    description: 'ID of an existing sale',
    example: 1,
  })
  @ApiNoContentResponse({ description: 'Sale successfully deleted' })
  @ApiNotFoundResponse({
    description: 'Sale not found',
    schema: {
      example: {
        message: 'Sale with ID 1 was not found',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  remove(@Param('id') id: string) {
    return this.salesService.remove(+id);
  }
}
