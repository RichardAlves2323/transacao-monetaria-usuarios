import { Injectable } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { Repository } from 'typeorm';
import { UserTypeOrm } from '../models/user.orm-entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepositoryByTypeOrm implements UserRepository {
  constructor(
    @InjectRepository(UserTypeOrm)
    private userRepositoryTypeOrm: Repository<UserTypeOrm>,
  ) {}

  public async save(user: User): Promise<User> {
    const userTypeOrm = UserTypeOrm.fromDomain(user);
    const savedUser = await this.userRepositoryTypeOrm.save(userTypeOrm);

    return UserTypeOrm.toDomain(savedUser);
  }

  public async findAll(): Promise<User[]> {
    const users = await this.userRepositoryTypeOrm.find();

    return users.map((user) => UserTypeOrm.toDomain(user));
  }

  public async findById(id: string): Promise<User | null> {
    const user = await this.userRepositoryTypeOrm.findOne({ where: { id } });

    return user ? UserTypeOrm.toDomain(user) : null;
  }

  public async findByUsername(username: string): Promise<User | null> {
    const user = await this.userRepositoryTypeOrm.findOne({
      where: { username },
    });

    return user ? UserTypeOrm.toDomain(user) : null;
  }

  public async update(user: User): Promise<User> {
    const userTypeOrm = UserTypeOrm.fromDomain(user);

    await this.userRepositoryTypeOrm.update(
      { id: userTypeOrm.id },
      userTypeOrm,
    );

    return UserTypeOrm.toDomain(userTypeOrm);
  }
}
