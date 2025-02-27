import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param, Post,
  Req,
  UseGuards
} from '@nestjs/common';

import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { MongoIdValidationPipe } from '@project/lib/core';
import { CreateUserDTO } from '@project/lib/shared/app/dto';
import { AuthenticatedUserRDO, CreatedUserRDO, UserInfoRDO } from '@project/lib/shared/app/rdo';
import { RequestWithTokenPayload } from '@project/lib/shared/app/types';
import { fillDto } from '@project/lib/shared/helpers';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { NotificationService } from '../notification/notification.service';

import { JWTAuthGuard } from './guards/jwt-auth.guard';
import {
  AUTHENTICATION_ERROR_RESPONSE,
  EXISTING_EMAIL_RESPONSE,
  GET_TOKEN_RESPONSE,
  NOT_FOUND_BY_ID_RESPONSE,
  Route,
  ROUTE_PREFIX,
  SUCCESSFUL_AUTHORIZATION_RESPONSE,
  TAG,
  USER_CREATED_RESPONSE,
  VALIDATION_ERROR_RESPONSE
} from './auth.constant';
import { UserEntity } from '../user/user.entity';
import { JWTRefreshGuard } from './guards/jwt-refresh.guard';
import { PostService } from '../post/post.service';

@ApiTags(TAG)
@Controller(ROUTE_PREFIX)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly notificationService: NotificationService,
    private readonly postService: PostService
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: USER_CREATED_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: VALIDATION_ERROR_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: EXISTING_EMAIL_RESPONSE
  })
  @Post(Route.Registration)
  public async create(@Body() dto: CreateUserDTO) {
    const newUser = await this.authService.registerUser(dto);
    await this.notificationService.registerSubscriber({ email: newUser.email })

    return fillDto(CreatedUserRDO, newUser.toObject());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: SUCCESSFUL_AUTHORIZATION_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: VALIDATION_ERROR_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: AUTHENTICATION_ERROR_RESPONSE
  })
  @Post(Route.Authentication)
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  public async login(@Req() { user }: { user?: UserEntity }) {
    const token = await this.authService.createToken(user)

    return fillDto(AuthenticatedUserRDO, { ...user.toObject(), ...token });
  }

  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: VALIDATION_ERROR_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: NOT_FOUND_BY_ID_RESPONSE
  })
  @UseGuards(JWTAuthGuard)
  @Get(Route.UserParam)
  @HttpCode(HttpStatus.OK)
  public async show(@Param('id', MongoIdValidationPipe) id: string) {
    const user = await this.authService.getUser(id);
    const postCount = await this.postService.getPosts({userId: id})

    return fillDto(UserInfoRDO, user.toObject());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: GET_TOKEN_RESPONSE
  })
  @UseGuards(JWTRefreshGuard)
  @Post(Route.Refresh)
  @HttpCode(HttpStatus.OK)
  public async refreshToken(@Req() { user }: { user?: UserEntity }) {
    return this.authService.createToken(user);
  }

  @UseGuards(JWTAuthGuard)
  @Post(Route.Check)
  public async checkToken(@Req() { user }: RequestWithTokenPayload) {
    return user;
  }
}
