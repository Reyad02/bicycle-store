import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TError = {
  message: string;
  stack: string;
  success: boolean;
  error: object;
};

export type TMEta = {
  limit: number;
  page: number;
  totalResult: number;
  totalPage: number;
};

export type TResponse<T> = {
  data?: T;
  error?: TError;
  metaData?: TMEta;
  success: boolean;
  message: string;
};
export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;
