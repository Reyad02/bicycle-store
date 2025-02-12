export interface IError {
  message: string;
  success: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
  stack: string;
}

export interface ICustomError {
  message: string;
  success: boolean;
  err: Err;
  stack: string;
}

export interface Err {
  issues?: Issue[];
  name?: string;
}

export interface Issue {
  code?: string;
  minimum?: number;
  type?: string;
  inclusive?: boolean;
  exact?: boolean;
  message: string;
  path?: string[];
}
