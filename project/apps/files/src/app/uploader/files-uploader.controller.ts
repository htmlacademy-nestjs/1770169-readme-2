import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { fillDto } from '@project/lib/shared/helpers';
import { MongoIdValidationPipe } from '@project/lib/core';

import { FilesRDO } from './rdo/files.rdo';
import { FilesUploaderService } from './files-uploader.service';

@Controller('files')
export class FilesUploaderController {
  constructor(private readonly filesUploaderService: FilesUploaderService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  public async save(@UploadedFile() file: Express.Multer.File) {
    const recordedFile = await this.filesUploaderService.saveFile(file);

    return fillDto(FilesRDO, recordedFile.toObject());
  }

  @Get()
  public async show(@Param('id', MongoIdValidationPipe) id: string) {
    const existFile = await this.filesUploaderService.getFile(id);

    return fillDto(FilesRDO, existFile.toObject());
  }
}
