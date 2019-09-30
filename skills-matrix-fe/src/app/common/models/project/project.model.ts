export interface Project {
  id: string;
  name: string;
  display_name: string;
  start_date: Date;
  end_date: Date;
}

export interface GetProjectsServiceResponse {
  success: boolean;
  data: any;
}
