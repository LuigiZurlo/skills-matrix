export class ApiResponse {

  constructor(
    public success: boolean = true,
    public message: string,
    public data: any,
    public code: number,
  ) {}

}
