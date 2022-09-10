import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterUserAuthDto } from './dto/register-user-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { UserProfile } from 'src/users/entities/user-profile.entity';
import { DataSource, Repository } from 'typeorm';
import { queries } from '../database/queries';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersModel: Repository<User>,
    @InjectRepository(UserProfile)
    private profilesModel: Repository<UserProfile>,
    private jwtService: JwtService,
    private dataSource: DataSource,
  ) {}

  async register(userObject: RegisterUserAuthDto) {
    const { name, email, address, password } = userObject;
    const hashedPassword = await hash(password, 10);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const resultProfile = await queryRunner.query(queries.createUserProfile, [
        name,
        address,
      ]);

      const resultUser = await queryRunner.query(queries.createUser, [
        email,
        hashedPassword,
        resultProfile.insertId,
      ]);

      await queryRunner.commitTransaction();
      return 'User created';
    } catch (error) {
      await queryRunner.rollbackTransaction();

      switch (error.code) {
        case 'ER_DUP_ENTRY':
          throw new HttpException('Duplicated email', HttpStatus.BAD_REQUEST);
        default:
          throw new HttpException(
            'Server Error',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    } finally {
      await queryRunner.release();
    }
  }

  async login(loginObject: LoginAuthDto) {
    const { email, password } = loginObject;

    const users = await this.dataSource.query(queries.login, [email]);

    if (users && users.length === 0)
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);

    const user = users[0];
    const checkPassword = await compare(password, user.password);
    if (!checkPassword)
      throw new HttpException('Incorrect Credentials', HttpStatus.UNAUTHORIZED);

    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = await this.jwtService.sign(payload);

    return token;
  }
}
