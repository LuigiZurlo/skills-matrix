export interface Skill {
  id: string;
  name: string;
  display_name: string;
}

export interface GetSkillsServiceResponse {
  success: boolean;
  data: any;
}
