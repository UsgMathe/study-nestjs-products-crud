import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UsersModule, AuthModule],
  providers: [SeedService, UsersService, AuthService],
})
export class SeedModule {}
