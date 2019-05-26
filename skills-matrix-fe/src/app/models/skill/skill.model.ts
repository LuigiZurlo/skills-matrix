export interface Skill {
  id: string;
  name: string;
  display_name: string;
  category: string;
  scope: string;
}

export interface GetSkillsServiceResponse {
  success: boolean;
  data: any;
}
