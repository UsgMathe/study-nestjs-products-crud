import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SeedService {
  constructor(private readonly usersService: UsersService) {}

  async createAdminUser() {
    const foundAdminUser = await this.usersService
      .findOne({
        where: { username: 'admin' },
      })
      .catch(() => {
        console.log('Admin user not found.');
      });

    if (!foundAdminUser) {
      await this.usersService.create({
        username: process.env.ADMIN_USER,
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        passwordConfirmation: process.env.ADMIN_PASSWORD,
      });

      console.log('Admin user created!');

      return;
    }

    console.log('Admin user already exists.');
  }
}
