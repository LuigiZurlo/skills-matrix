export interface Resource {
  id: string;
  name: {
    first: string;
    last: string
  };
  employee_id: string;
}

export interface GetResourcesServiceResponse {
  success: boolean;
  data: any;
}
