import { Expose } from 'class-transformer';

export class FilesRDO {
  @Expose()
  public id: string;

  @Expose()
  public originalName: string;

  @Expose()
  public subDirectory: string;

  @Expose()
  public size: number;

  @Expose()
  public mimetype: string;

  @Expose()
  public hashName: string;

  @Expose()
  public path: string;

  @Expose()
  public createdAt: Date;
}
