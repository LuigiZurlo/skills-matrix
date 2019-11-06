export class Mission {
  id: number;
  resource_id: number;
  project_id: number;
  position_id: number;
  start_date: Date;
  end_date: Date;
  is_active: boolean;

  // tslint:disable-next-line:variable-name
  constructor(resource_id, project_id, position_id, start_date, end_date, is_active) {
    this.resource_id = resource_id;
    this.project_id = project_id;
    this.position_id = position_id;
    this.start_date = start_date;
    this.end_date = end_date;
    this.is_active = is_active;
  }
}

export interface GetMissionsServiceResponse {
  success: boolean;
  data: any;
}
