export interface GetPositionsServiceResponse {
  success: boolean;
  data: any;
}

export class Position {
  id: number;
  project_id: number;
  name: string;
  description: string;

  constructor(project_id, name, description = null) {
    this.project_id = project_id;
    this.name = name;
    this.description = description;
  }

}
