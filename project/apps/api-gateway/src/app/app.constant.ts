export enum ApplicationServiceURL {
  Users = 'http://localhost:5000/api/user',
  Posts = 'http://localhost:5010/api/posts',
  Files = 'http://localhost:5020/api/files',
  Notifications = 'http://localhost:5030/api/files',
  NewsFeed = 'http://localhost:5040/api/files'
}

export const HTTP_CLIENT_MAX_REDIRECTS = 5;
export const HTTP_CLIENT_TIMEOUT = 5000;
export const INTERNAL_SERVER_ERROR_MESSAGE = 'Internal server error';
