import { ClassTransformOptions, plainToInstance } from 'class-transformer';

import { REGEX, TIME_REGEX, VALUE_PARSE_ERROR, WRONG_TIME_ERROR } from './helpers.constant';
import { DateTimeUnit, TimeAndUnit } from './helpers.types';

export function fillDto<T, P>(dto: new () => T, plainObject: P, options?: ClassTransformOptions): T;

export function fillDto<T, P>(dto: new () => T, plainObject: P, options?: ClassTransformOptions): T[];

export function fillDto<T, P>(dto: new () => T, plainObject: P, options?: ClassTransformOptions): T | T[] {
  return plainToInstance(dto, plainObject, {excludeExtraneousValues: true, ...options});
}

export function createMessage<T>(message: string, expressions: T[] = []): string {
  if (!expressions.length) {
    return message.replace(REGEX, '').trim();
  }

  return expressions.reduce((accumulator: string, currentValue: T) => accumulator.replace(REGEX, String(currentValue)), message);
}

export function getMongoConnectionString({host, port, database, username, userPassword, authSource}): string {
  return `mongodb://${username}:${userPassword}@${host}:${port}/${database}?authSource=${authSource}`;
}

export function getRabbitMQConnectionString({user, password, host, port}): string {
  return `amqp://${user}:${password}@${host}:${port}`;
}

export function parseBoolean(value: string | undefined): boolean {
  return value === 'true';
};

export function parseTime(time: string): TimeAndUnit {
  const match = TIME_REGEX.exec(time);

  if (!TIME_REGEX.exec(time)) {
    throw new Error(createMessage(WRONG_TIME_ERROR, [time]));
  }

  const [, valueRaw, unitRaw] = match;
  const value = parseInt(valueRaw, 10);
  const unit = unitRaw as DateTimeUnit;

  if (isNaN(value)) {
    throw new Error(VALUE_PARSE_ERROR);
  }

  return {value, unit}
}
