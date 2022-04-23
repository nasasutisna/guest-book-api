export class ResponseData {
  public data: any;
  public message: any;
  constructor(data: any, message: string) {
    this.data = data;
    this.message = message;
  }
}
