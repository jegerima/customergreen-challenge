import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from './users.service';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('info')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'User must be authenticated with token' })
  getInfo(@Request() req) {
    return this.usersService.getInfo(req.user.userId);
  }
}
