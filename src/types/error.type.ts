export interface IError {
    message: string;
    success: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any;
    stack: string;
  }