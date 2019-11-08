export class Project {
  id: string;
  name: string;
  start_date: Date;
  end_date: Date;

  constructor(name, start_date, end_date) {
    this.name = name;
    this.start_date = start_date;
    this.end_date = end_date;
  }

}

export interface GetProjectsServiceResponse {
  success: boolean;
  data: any;
}
