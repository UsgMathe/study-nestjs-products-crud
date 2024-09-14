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
  ApiAcceptedResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@ApiBearerAuth('AUTH_KEY')
@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiCreatedResponse({
    type: Category,
    description: 'Category successfully created.',
  })
  @ApiConflictResponse({
    description: 'Conflict error when trying to create a duplicate category.',
    example: {
      message: "Category with name 'Electronics' already exists",
      error: 'Conflict',
      statusCode: 409,
    },
  })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiOkResponse({
    type: [Category],
    description: 'List of categories.',
  })
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find category by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of category to return',
    example: 1,
  })
  @ApiOkResponse({
    type: Category,
    description: 'Found category.',
  })
  @ApiNotFoundResponse({
    description: 'Category not found',
    schema: {
      example: {
        message: 'Category with ID 1 was not found',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing category' })
  @ApiParam({
    name: 'id',
    description: 'ID of an existing product',
    example: 1,
  })
  @ApiBody({ type: CreateCategoryDto })
  @ApiOkResponse({
    type: Category,
    description: 'Updated category.',
  })
  @ApiNotFoundResponse({
    description: 'Category not found',
    schema: {
      example: {
        message: 'Category with ID 1 was not found',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Deletes a existing category' })
  @ApiParam({
    name: 'id',
    description: 'ID of an existing product',
    example: 1,
  })
  @ApiNoContentResponse({ description: 'Category successfully deleted.' })
  @ApiNotFoundResponse({
    description: 'Category not found',
    schema: {
      example: {
        message: 'Category with ID 1 was not found',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
