import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

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

    await this.usersRepository.save(user);

    return {
      id: user.id,
      username: user.username,
      email: user.email,
    };
  }

  findAll(options?: FindManyOptions<User>) {
    return this.usersRepository.find(options);
  }

  async findOne(options?: FindOneOptions<User>) {
    const foundUser = await this.usersRepository.findOne(options);

    if (!foundUser) {
      throw new NotFoundException(`User not found`);
    }

    return foundUser;
  }

  async findOneById(id: number, options?: FindOneOptions<User>) {
    const foundUser = await this.usersRepository.findOne({
      where: { id, ...options?.where },
      ...options,
    });

    if (!foundUser)
      throw new NotFoundException(`User with ID ${id} was not found`);

    return foundUser;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const foundUser = await this.findOneById(id);
    if (updateUserDto.oldPassword) {
      const isValidPassword = await this.authService.comparePasswords(
        updateUserDto.oldPassword,
        foundUser.password,
      );

      if (!isValidPassword) {
        return new BadRequestException('Old password is incorrect.');
      }

      const password = await this.authService.hashPassword(
        updateUserDto.newPassword,
      );

      const user = this.usersRepository.create({
        ...updateUserDto,
        password: password,
      });

      await this.usersRepository.update(id, user);

      return this.findOneById(id, { select: ['id', 'username', 'email'] });
    }

    const user = this.usersRepository.create(updateUserDto);
    await this.usersRepository.update(id, user);

    return this.findOneById(id, { select: ['id', 'username', 'email'] });
  }

  async remove(id: number) {
    await this.findOneById(id);

    await this.usersRepository.delete({ id });
    return;
  }
}
