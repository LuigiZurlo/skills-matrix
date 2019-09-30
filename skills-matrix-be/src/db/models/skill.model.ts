export namespace skillFields {
  export type id = number;
  export type name = string;
  export type display_name = string;
  export type created_at = Date;
  export type updated_at = Date;
}

export interface Skill {
  id: skillFields.id;
  name: skillFields.name;
  display_name: skillFields.display_name;
  created_at: skillFields.created_at;
  updated_at: skillFields.updated_at;
}
