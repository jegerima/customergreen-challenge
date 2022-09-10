import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, IsEmail } from 'class-validator';

export class RegisterUserAuthDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  address: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({ description: 'Min 8 characters' })
  password: string;
}
