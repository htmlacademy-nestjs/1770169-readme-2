import 'multer';
import FormData from 'form-data';

import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseFilters,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { ParseFormDataJsonPipe } from '@project/lib/core';
import { CreateUserDTO, LoginUserDTO } from '@project/lib/shared/app/dto';
import { File, UploadCatalog } from '@project/lib/shared/app/types';

import { ApplicationServiceURL } from './app.constant';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';


@Controller('user')
@UseFilters(AxiosExceptionFilter)
export class CustomersController {
  constructor(
    private readonly httpService: HttpService
  ) {}

  @Post('sign-up')
  @UseInterceptors(FileInterceptor(UploadCatalog.Avatar))
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

  @Post('sign-in')
  public async login(@Body() loginUserDto: LoginUserDTO) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/sign-in`, loginUserDto);

    return data;
  }

  @Get(':id')
  public async show(@Param('id') id: string, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${id}`, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });

    return data;
  }

  @Post('refresh')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/refresh`, null, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });

    return data;
  }
}
