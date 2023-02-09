import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';

// ログインユーザはこのjwtのガードを行う際にReqに追加される
@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get()
  // Omit を利用して User から hashedPassword を除いた型を割り当てることができる
  getLoginUser(@Req() req: Request): Omit<User, 'hashedPassword'> {
    // auth/strategy/jwt.stratagy.ts で取得したユーザーを返す
    return req.user;
  }

  @Patch()
  updateUser(
    @Req() req: Request,
    @Body() dto: UpdateUserDto,
  ): Promise<Omit<User, 'hashedPassword'>> {
    return this.UserService.updateUser(req.user.id, dto);
  }
}
