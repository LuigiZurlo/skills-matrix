export namespace resourceFields {
  export type id = number;
  export type first_name = string;
  export type last_name = string;
  export type employee_number = string;
  export type email = string | null;
}

export interface Resource {
  id: resourceFields.id;
  first_name: resourceFields.first_name;
  last_name: resourceFields.last_name;
  employee_number: resourceFields.employee_number;
  email: resourceFields.email;
}
