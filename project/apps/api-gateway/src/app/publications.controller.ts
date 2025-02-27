import 'multer';
import FormData from 'form-data';

import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { ParseFormDataJsonPipe } from '@project/lib/core';
import { CreatePostDTO } from '@project/lib/shared/app/dto';
import { UploadCatalog } from '@project/lib/shared/app/types';

import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { UserIdInterceptor } from './interceptor/userid.interceptor';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { ApplicationServiceURL } from './app.constant';


@Controller('publications')
@UseFilters(AxiosExceptionFilter)
export class PublicationsController {
  constructor(
      private readonly httpService: HttpService
  ) {}

  @Post('create')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(FileInterceptor(UploadCatalog.Photo), UserIdInterceptor)
  public async create(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
    @Body(ParseFormDataJsonPipe) dto: CreatePostDTO
  ) {
    const contentType = req.headers['content-type'];

      if (contentType.includes('multipart/form-data') && file && dto.type === 'photo') {
        const formData = new FormData();
        formData.append(UploadCatalog.Photo, file.buffer, {
          filename: file.originalname,
          contentType: file.mimetype
        });
        const { data: image } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Files}/upload`, formData, {
          headers: {
            ...formData.getHeaders()
          }
        });
        const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Posts}`, {
          ...dto,
          image: image.hashName
        });

        return data;
      }
      const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Posts}`, dto);

      return data;
  }


  @Post('/')
  public async index() {
    const { data } =await this.httpService.axiosRef.post(`${ApplicationServiceURL.Posts}`);

    return data;
  }
}


