export interface Skill {
  id: number;
  name: string;
  category: string;
  scope: string;
}

export interface GetSkillsServiceResponse {
  success: boolean;
  data: any;
}
