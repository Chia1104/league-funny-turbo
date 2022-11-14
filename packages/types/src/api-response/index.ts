export interface ApiResponse<T = any> {
  status: number | string;
  data: T;
}
