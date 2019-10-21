export class Resource {

  constructor(
    public id: number,
    public first_name: string,
    public last_name: string,
    public employee_number: string
  ) { }

}

export interface GetResourcesServiceResponse {
  success: boolean;
  data: any;
}
