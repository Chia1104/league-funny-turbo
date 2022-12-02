export enum ApiResponseStatus {
  SUCCESS = "success",
  ERROR = "error",
}

export interface ApiResponse<T = any> {
  status: number | string | ApiResponseStatus;
  data: T;
}
