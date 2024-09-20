import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1 })
  id: number;

  @Column({ length: 50 })
  @ApiProperty({ example: 'UsgMathe' })
  username: string;

  @Column()
  @ApiProperty({ example: 'usgmathe@email.com' })
  email: string;

  @Column()
  @ApiProperty({ example: 'difficultPassword@123' })
  password: string;
}
