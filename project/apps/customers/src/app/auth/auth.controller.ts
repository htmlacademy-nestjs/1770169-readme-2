import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { NewUserRdo } from './rdo/new-user.rdo';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { UserRdo } from './rdo/user.rdo';
import { fillDto } from '@project/lib/shared/helpers';

@Controller('user')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('sign-up')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.registerUser(dto);
    return fillDto(NewUserRdo, newUser.toObject());
  }

  @Post('sign-in')
  public async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authService.verifyUser(dto);
    return fillDto(LoggedUserRdo, verifiedUser.toObject());
  }

  @Get(':id')
  public async show(@Param('id') id: string) {
    const user = await this.authService.getUser(id);
    return fillDto(UserRdo, user.toObject());
  }
}
