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
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@ApiBearerAuth('AUTH_KEY')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiCreatedResponse({
    description: 'User successfully created',
    type: UserResponseDto,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ description: 'List of users', type: [UserResponseDto] })
  findAll() {
    return this.usersService.findAll({ select: ['id', 'username', 'email'] });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find user by ID' })
  @ApiParam({ name: 'id', description: 'ID of user', example: 1 })
  @ApiOkResponse({ description: 'Found user', type: UserResponseDto })
  @ApiNotFoundResponse({
    description: 'User not found',
    schema: {
      example: {
        message: 'User with ID 1 was not found',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOneById(+id, {
      select: ['id', 'username', 'email'],
    });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing user' })
  @ApiParam({ name: 'id', description: 'ID of user', example: 1 })
  @ApiOkResponse({ description: 'Found user', type: UserResponseDto })
  @ApiNotFoundResponse({
    description: 'User not found',
    schema: {
      example: {
        message: 'User with ID 1 was not found',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Deletes a existing user' })
  @ApiParam({ name: 'id', description: 'ID of an existing user', example: 1 })
  @ApiNoContentResponse({ description: 'User successfully deleted' })
  @ApiNotFoundResponse({
    description: 'User not found',
    schema: {
      example: {
        message: 'User with ID 1 was not found',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
