export interface HttpErrorData {
  code: number;
  message: string;
}

export interface HttpResponseInterface {
  success: boolean;
  errors?: HttpErrorData[];
  result?: any;
}

export interface ResponseInterface<T> extends HttpResponseInterface { result?: T; }
