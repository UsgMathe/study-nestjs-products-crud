import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { username, email, password, passwordConfirmation } = createUserDto;

    const foundUserByUsername = await this.usersRepository.findOne({
      where: { username: username },
    });

    const foundUserByEmail = await this.usersRepository.findOne({
      where: { email: email },
    });

    console.log({ foundUserByUsername, foundUserByEmail });

    if (foundUserByUsername && foundUserByEmail) {
      throw new ConflictException(
        'User already registered with this username and email',
      );
    }

    if (foundUserByUsername)
      throw new ConflictException('User already registered with this username');

    if (foundUserByEmail)
      throw new ConflictException('User already registered with this email');

    if (password != passwordConfirmation) {
      return new BadRequestException('Passwords do not match');
    }

    const hashedPassword = await this.authService.hashPassword(password);

    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    console.log(user);

    console.log(
      await this.authService.comparePasswords(password, hashedPassword),
    );

    await this.usersRepository.save(user);

    return {
      id: user.id,
      username: user.username,
      email: user.email,
    };
  }

  findAll() {
    return this.usersRepository.find({ select: ['id', 'username', 'email'] });
  }

  async findOne(id: number) {
    const foundUser = await this.usersRepository.findOne({
      select: ['id', 'username', 'email'],
      where: { id },
    });

    if (!foundUser)
      throw new NotFoundException(`User with ID ${id} was not found`);

    return foundUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
