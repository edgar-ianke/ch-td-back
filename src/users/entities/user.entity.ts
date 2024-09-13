import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../base-entity/base.entity';
import {
  IsEmail,
  IsNotEmpty,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Commentary } from '../../comments/entities/comment.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(30)
  username: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column({ default: 'Пока ничего не рассказал о себе' })
  about: string;

  @Column()
  @IsUrl()
  avatar: string;

  @OneToMany(() => Commentary, (comment) => comment.author)
  Commentary: Commentary[];
}
