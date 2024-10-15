import { SortType } from '@project/lib/shared/app/types';

export const DEFAULT_MAX_POST_COUNT = 25;
export const DEFAULT_SORT_TYPE = SortType.Desc;
export const NOT_FOUND_BY_ID_MESSAGE = 'The post with this id: %id% not found.';
export const REPOST_ERROR_MESSAGE = 'Allowed to repost the publication can be done once';

export const TypeProperty = {
  DESCRIPTION: 'The type of blog post is one of five types: video, text, quote, photo, link.',
  EXAMPLE: 'video'
}

export const StatusProperty = {
  DESCRIPTION: 'The publication status is one of two states: published or draft.',
  EXAMPLE: 'published'
}

export const UserIdProperty = {
  DESCRIPTION: 'A unique user ID.',
  EXAMPLE: '667c673deb3171fbdaa4ce26'
}

export const URLProperty = {
  DESCRIPTION: 'Valid URL.',
  EXAMPLE: 'https://nestjs.com/'
}

export const DescriptionProperty = {
  DESCRIPTION: 'Description of the content.',
  EXAMPLE: 'A progressive framework for creating efficient, reliable and scalable server applications.'
}

export const ImageProperty = {
  DESCRIPTION: 'Image in jpg or png format.',
  EXAMPLE: 'upload/cat.jpg'
}

export const AuthorProperty = {
  DESCRIPTION: 'The author of the quote.',
  EXAMPLE: 'Fyodor Dostoevsky'
}

export const ContentProperty = {
  DESCRIPTION: 'The contents of the publication.',
  EXAMPLE: 'One must love life more than the very meaning of life!'
}

export const TitleProperty = {
  DESCRIPTION: 'Title of the publication',
  EXAMPLE: 'Artificial intelligence still deprives people of work.'
}

export const PreviewProperty = {
  DESCRIPTION: 'Announcement of the publication.',
  EXAMPLE: 'The scientific journal has used AI to create scientific articles.'
}

export const TagsProperty = {
  DESCRIPTION: 'List of publication tags.',
  EXAMPLE: '#city#japan#sunrise#tokio'
}

export const PublishedDateProperty = {
  DESCRIPTION: 'The publication publication date.',
  EXAMPLE: '2022-01-18T17:36:34.064Z'
}
