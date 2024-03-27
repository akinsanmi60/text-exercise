import { AxiosRequestConfig } from 'axios';
import customAxiosMethod from './customAxiosMethod';
export type ApiObjType = Record<
  string,
  string | undefined | number | string[] | number[]
>;
interface FuncProp<T> {
  url: string;
  payload?: T;
  config?: AxiosRequestConfig;
}

export const postRequest = async <T, R>({ url, payload }: FuncProp<T>) => {
  const response = await customAxiosMethod.post<R>(url, payload);

  const { data: availData } = response;

  return availData;
};

export const putRequest = async <T, R>({ url, payload }: FuncProp<T>) => {
  const response = await customAxiosMethod.put<R>(url, payload);

  const { data: availData } = response;

  return availData;
};

export const deleteRequest = async <R>({ url }: { url: string }) => {
  const { data } = await customAxiosMethod.delete<R>(url);

  return data;
};

export const getRequest = async <R>({ url }: { url: string }) => {
  const response = await customAxiosMethod.get<R>(url);

  const { data: availData } = response;

  return availData;
};
