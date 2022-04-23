import { HttpException } from "@nestjs/common";

export class ResponseData {
  public data: any;
  public message: any;
  constructor(data: any, message: string) {
    this.data = data;
    this.message = message;
  }
}
export const responseData = (data, message) => new ResponseData(data, message);
export const responseError = (message: string, code = 400) => {
  return Promise.reject(new HttpException({ message }, code));
};
