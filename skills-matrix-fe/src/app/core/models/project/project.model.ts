export class Project {
  id: string;
  name: string;
  project_opt_code: string;
  start_date: Date;
  end_date: Date;

  constructor(name, project_opt_code, start_date, end_date) {
    this.name = name;
    this.project_opt_code = project_opt_code;
    this.start_date = start_date;
    this.end_date = end_date;
  }

}

export interface GetProjectsServiceResponse {
  success: boolean;
  data: any;
}
