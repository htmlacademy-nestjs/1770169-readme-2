export const BAD_MONGO_ID_ERROR = 'Bad entity ID';
export const PIPE_USE_ERROR = 'This pipe must used only with params!';

export enum ParamType {
  Body = 'body',
  Query = 'query',
  Param = 'param',
  Custom = 'custom'
}
