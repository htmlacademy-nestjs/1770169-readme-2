export const DEFAULT_MAX_COMMENT_COUNT = 50;
export const NOT_FOUND_BY_ID_MESSAGE ='The comment with this id: %id% not found.';

export const COMMENT_CREATED_RESPONSE = 'The comment was successfully created.';
export const COMMENTS_FOUND_RESPONSE = 'The comments were successfully found.';
export const COMMENT_DELETE_RESPONSE = 'The comment was successfully deleted.';
export const NOT_AUTHORIZED_RESPONSE = 'The user is not logged in.';
export const CONTENT_TYPE_MESSAGE = 'The field must be a string.';
export const CONTENT_LENGTH_MESSAGE = 'The length should be from 10 to 300 characters.';
export const USER_ID_TYPE_MESSAGE = 'The Id must be of the MongoId type.';
export const REQUIRED_MESSAGE = 'The field should not be empty.';

export const ROUTE_PREFIX = 'posts/:postId/comments';
export const TAG = 'Comments';

export const COMMENT_LENGTH = {
  MIN: 10,
  MAX: 300
}
