import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';

import { Types } from 'mongoose';

import { MONGO_ID_VALIDATION_ERROR, WRONG_DATA_TYPE } from './pipes.constant';

export class MongoIdValidationPipe implements PipeTransform {
  public transform(value: string, metadata: ArgumentMetadata) {
    if (metadata.type !== 'param') {
      throw new Error(WRONG_DATA_TYPE);
    }

    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(MONGO_ID_VALIDATION_ERROR);
    }

    return value;
  }
}
