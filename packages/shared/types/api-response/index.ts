export enum ApiResponseStatus {
  SUCCESS = "success",
  ERROR = "error",
}

export interface ApiResponse<T = any> {
  statusCode?: number;
  status: number | string | ApiResponseStatus;
  data: T;
}
