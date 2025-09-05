import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import RequestWithUser from 'src/guard/request.user';
import { AuthGuard } from 'src/guard/jwt.auth.guard';
import { UpdatePasswordDto } from './dto/update-password';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('myprofile')
  @ApiOperation({ summary: 'Foydalanuvchi profilini olish' })
  @ApiResponse({ status: 200, description: 'Foydalanuvchi profili' })
  get(@Req() req: RequestWithUser) {
    const userId = req.user.id;
    return this.usersService.getProfile(userId);
  }

  @Patch('myprofile')
  @ApiOperation({ summary: 'Profil maʼlumotlarini yangilash' })
  @ApiResponse({ status: 200, description: 'Profil yangilandi' })
  @ApiBody({ type: UpdateUserDto })
  update(
    @Req() req: RequestWithUser,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const userId = req.user.id;
    return this.usersService.updateProfile(userId, updateUserDto);
  }

  @Delete('myprofile')
  @ApiOperation({ summary: 'Profilni o‘chirish' })
  @ApiResponse({ status: 200, description: 'Profil o‘chirildi' })
  delete(@Req() req: RequestWithUser) {
    const userId = req.user.id;
    return this.usersService.deleteProfile(userId);
  }

  @Patch('new/password')
  @ApiOperation({ summary: 'Parolni yangilash' })
  @ApiResponse({ status: 200, description: 'Parol yangilandi' })
  @ApiBody({ type: UpdatePasswordDto })
  updateed(
    @Req() req: RequestWithUser,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const userId = req.user.id;
    return this.usersService.updatePassword(userId, updatePasswordDto);
  }

  @Post('fcm-token')
  @ApiOperation({ summary: 'Foydalanuvchi FCM tokenini saqlash' })
  @ApiResponse({ status: 201, description: 'FCM token saqlandi' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'number', example: 1 },
        fcmToken: {
          type: 'string',
          example: 'fcm_token_abc123xyz456',
        },
      },
    },
  })
  async saveFcmToken(
    @Body() body: { userId: number; fcmToken: string },
  ) {
    return this.usersService.saveFcmToken(body.userId, body.fcmToken);
  }
}
