export interface GetPositionsServiceResponse {
  success: boolean;
  data: any;
}

export interface Position {
  id: number;
  project_id: number;
  name: string;
  description: string;
}
