export interface ApiResult<T = any> {
  status: number;
  data?: T;
}
