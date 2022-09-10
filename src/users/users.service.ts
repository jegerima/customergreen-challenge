import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { UserProfile } from './entities/user-profile.entity';
import { User } from './entities/user.entity';
import { queries } from '../database/queries';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersModel: Repository<User>,
    @InjectRepository(UserProfile)
    private profilesModel: Repository<UserProfile>,
    private dataSource: DataSource,
  ) {}

  async getInfo(id: number) {
    const users = await this.dataSource.query(queries.getUserById, [id]);

    if (users && users.length === 0)
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);

    return users[0];
  }
}
