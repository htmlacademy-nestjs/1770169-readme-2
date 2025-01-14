export const NOT_FOUND_BY_ID_MESSAGE = 'The photo post with this id: %id% not found.';
export const TYPE_MESSAGE = 'The field must be a string.';
export const SIZE_MESSAGE = 'The maximum photo size should be 1 megabyte.';
export const FORMAT_MESSAGE = 'The photo format should be jpg or png.';
export const REQUIRED_MESSAGE = 'The field should not be empty.';

export const MAX_SIZE = 1E6;

export const PhotoProperty = {
  DESCRIPTION: 'Photo in jpg or png format.',
  EXAMPLE: 'upload/cat.jpg'
}

export enum ImageFormat {
  JPEG = 'image/jpeg',
  PNG = 'image/png'
}
