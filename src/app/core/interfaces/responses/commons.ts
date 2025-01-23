export interface ResponseBase<T> {
  status: number;
  success: boolean;
  message: string;
  response: T;
}

export interface error {
  title: string;
  detail: string;
}

export interface ErrorsResponse {
  errors: error[];
}

export interface ServiceResp<T> {
  error: boolean;
  msg: string;
  data?: T;
}
