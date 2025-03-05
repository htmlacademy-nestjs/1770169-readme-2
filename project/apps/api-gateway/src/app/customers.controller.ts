import 'multer';

import FormData from 'form-data';

import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseFilters,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ParseFormDataJsonPipe } from '@project/lib/core';
import { CreateUserDTO, LoginUserDTO, UpdatePasswordDTO } from '@project/lib/shared/app/dto';
import { File, Route, UploadCatalog } from '@project/lib/shared/app/types';

import {
  ApplicationServiceURL,
  SUCCESSFUL_AUTHORIZATION_RESPONSE,
  CREATE_USER_API_OPERATION,
  USER_CREATED_RESPONSE,
  USER_ROUTE_PREFIX,
  USER_TAG,
  VALIDATION_ERROR_RESPONSE,
  USER_AUTH_API_OPERATION,
  AUTHENTICATION_ERROR_RESPONSE,
  USER_ID_API_QUERY,
  USER_INFO_API_OPERATION,
  NOT_FOUND_BY_USER_ID_MESSAGE,
  USER_FOUND_RESPONSE,
  USER_EXISTS_MESSAGE,
  USER_UPDATE_API_OPERATION,
  USER_ID_API_PARAM,
  NOT_AUTHORIZED_RESPONSE,
  USER_UPDATE_RESPONSE,
  WRONG_PASSWORD_MESSAGE,
  USER_SUBSCRIBE_API_OPERATION,
  USER_SUBSCRIBE_MESSAGE,
  REFRESH_TOKEN_API_OPERATION,
  TOKEN_NOT_FOUND_ERROR,
  TOKEN_CREATE_ERROR
} from './app.constant';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';

@ApiTags(USER_TAG)
@Controller(USER_ROUTE_PREFIX)
@UseFilters(AxiosExceptionFilter)
export class CustomersController {
  constructor(
    private readonly httpService: HttpService
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
    description: USER_EXISTS_MESSAGE
  })
  @ApiOperation({
    summary: CREATE_USER_API_OPERATION.SUMMARY,
    description: CREATE_USER_API_OPERATION.DESCRIPTION,
  })
  @UseInterceptors(FileInterceptor(UploadCatalog.Avatar))
  @HttpCode(HttpStatus.CREATED)
  @Post(Route.Registration)
  public async create(
    @UploadedFile() file: Express.Multer.File,
    @Body(ParseFormDataJsonPipe) dto: CreateUserDTO
  ) {
    let image: File;

    if (file) {
      const formData = new FormData();
      formData.append(UploadCatalog.Avatar, file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype
      });
      const result = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Files}/upload`, formData, {
        headers: {
          ...formData.getHeaders()
        }
      });
      image = result.data;
    }
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/sign-up`, {
      ...dto,
      avatar: image?.hashName
    });

    return data;
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
    status: HttpStatus.UNAUTHORIZED,
    description: AUTHENTICATION_ERROR_RESPONSE
  })
  @ApiOperation({
    summary: USER_AUTH_API_OPERATION.SUMMARY,
    description: USER_AUTH_API_OPERATION.DESCRIPTION,
  })
  @HttpCode(HttpStatus.OK)
  @Post(Route.Authentication)
  public async login(@Body() dto: LoginUserDTO) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/sign-in`, dto);

    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description:USER_FOUND_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: NOT_FOUND_BY_USER_ID_MESSAGE
  })
  @ApiQuery({
    name: USER_ID_API_QUERY.NAME,
    type: USER_ID_API_QUERY.TYPE,
    description: USER_ID_API_QUERY.DESCRIPTION
  })
  @ApiOperation({
    summary: USER_INFO_API_OPERATION.SUMMARY,
    description: USER_INFO_API_OPERATION.DESCRIPTION,
  })
  @HttpCode(HttpStatus.OK)
  @Get(Route.Root)
  public async getById(@Query('userId') userId: string) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}`, {
      params: { userId }
    });

    return data;
  }

  @ApiResponse({
      status: HttpStatus.CREATED,
      description: USER_UPDATE_RESPONSE
    })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: NOT_FOUND_BY_USER_ID_MESSAGE
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: NOT_AUTHORIZED_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: VALIDATION_ERROR_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: WRONG_PASSWORD_MESSAGE
  })
  @ApiParam({
    name: USER_ID_API_PARAM.NAME,
    type: USER_ID_API_PARAM.TYPE,
    description: USER_ID_API_PARAM.DESCRIPTION
  })
  @ApiOperation({
    summary: USER_UPDATE_API_OPERATION.SUMMARY,
    description: USER_UPDATE_API_OPERATION.DESCRIPTION,
  })
  @HttpCode(HttpStatus.CREATED)
  @Patch(Route.Update)
  public async updatePassword(
    @Param('id') id: string,
    @Body() dto: UpdatePasswordDTO,
    @Req() req: Request
  ) {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Users}/${id}/update`, dto, {
      headers: { 'Authorization': req.headers['authorization'] }
    });

    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: USER_SUBSCRIBE_MESSAGE
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: NOT_FOUND_BY_USER_ID_MESSAGE
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: NOT_AUTHORIZED_RESPONSE
  })
  @ApiQuery({
    name: USER_ID_API_QUERY.NAME,
    type: USER_ID_API_QUERY.TYPE,
    description: USER_ID_API_QUERY.DESCRIPTION
  })
  @ApiParam({
    name: USER_ID_API_PARAM.NAME,
    type: USER_ID_API_PARAM.TYPE,
    description: USER_ID_API_PARAM.DESCRIPTION
  })
  @ApiOperation({
    summary: USER_SUBSCRIBE_API_OPERATION.SUMMARY,
    description: USER_SUBSCRIBE_API_OPERATION.DESCRIPTION,
  })
  @HttpCode(HttpStatus.OK)
  @Post(Route.Subscribe)
  public async subscribe(
    @Param('id') id: string,
    @Query('userId') subscriptionId: string,
    @Req() req: Request
  ) {
    await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/${id}/subscribe`, null, {
      headers: { 'Authorization': req.headers['authorization'] },
      params: { userId: subscriptionId }
    });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: TOKEN_CREATE_ERROR
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: TOKEN_NOT_FOUND_ERROR
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: NOT_AUTHORIZED_RESPONSE
  })
  @ApiOperation({
    summary: REFRESH_TOKEN_API_OPERATION.SUMMARY,
    description: REFRESH_TOKEN_API_OPERATION.DESCRIPTION,
  })
  @HttpCode(HttpStatus.OK)
  @Post(Route.Refresh)
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/refresh`, null, {
      headers: { 'Authorization': req.headers['authorization'] }
    });

    return data;
  }
}
