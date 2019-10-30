export class NotFound {
  private statusCode: number;

  constructor(
    private message: string = "The requested resource couldn't be found",
    private errorCode: number = 404,
  ) {
    this.statusCode = 404;
  }

}
