export class Resource {

  constructor(
    public id: number,
    public name: {
      first: string,
      last: string},
    public employeeId: string
  ) { }

}

export interface GetResourcesServiceResponse {
  success: boolean;
  data: any;
}
