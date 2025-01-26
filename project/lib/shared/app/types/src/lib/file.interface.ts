import { Timestamps } from './timestamps.interface';

export interface File extends Timestamps {
  id?: string;
  originalName: string;
  subDirectory: string;
  size: number;
  mimetype: string;
  hashName: string;
  path: string;
}
