import 'multer';

import dayjs from 'dayjs';

import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { randomUUID } from 'node:crypto';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { ensureDir } from 'fs-extra';

import { extension } from 'mime-types';

import { filesAppConfig } from '@project/lib/config/files';
import { createMessage } from '@project/lib/shared/helpers';
import { StoredFile } from '@project/lib/shared/app/types';

import { FilesEntity } from './files.entity';
import { DATE_FORMAT, FILE_WRITE_ERROR, NOT_FOUND_BY_ID_MESSAGE } from './files-uploader.constant';
import { FilesUploaderRepository } from './files-uploader.repository';

@Injectable()
export class FilesUploaderService {
  private readonly logger = new Logger(FilesUploaderService.name);

  constructor(
    @Inject(filesAppConfig.KEY)
    public readonly config: ConfigType<typeof filesAppConfig>,
    public readonly filesUploaderRepository: FilesUploaderRepository
  ) {}

  public async writeFile(file: Express.Multer.File): Promise<StoredFile> {
    try {
      const [year, month] = dayjs().format(DATE_FORMAT).split(' ');
      const fileExtension = extension(file.mimetype);
      const filename = `${randomUUID()}.${fileExtension}`;
      const subDirectory = join(year, month);
      const uploadDirectory = join(this.config.uploadDirectory, subDirectory);
      const path = join(uploadDirectory, filename);

      await ensureDir(uploadDirectory);
      await writeFile(path, file.buffer);

      return {
        fileExtension,
        filename,
        path,
        subDirectory,
      };
    } catch (error) {
      this.logger.error(createMessage(FILE_WRITE_ERROR, [error.message]));
      throw new Error(createMessage(FILE_WRITE_ERROR, [error.message]));
    }
  }

  public async saveFile(file: Express.Multer.File): Promise<FilesEntity> {
    const recordedFile = await this.writeFile(file);
    const fileEntity = FilesEntity.fromObject({
      hashName: recordedFile.filename,
      mimetype: file.mimetype,
      originalName: file.originalname,
      path: recordedFile.path,
      size: file.size,
      subDirectory: recordedFile.subDirectory,
    });

    return this.filesUploaderRepository.save(fileEntity);
  }

  public async getFile(id: string): Promise<FilesEntity> {
    const existFile = await this.filesUploaderRepository.findById(id);

    if(!existFile) {
      throw new NotFoundException(createMessage(NOT_FOUND_BY_ID_MESSAGE, [id]));
    }

    return existFile;
  }
}
