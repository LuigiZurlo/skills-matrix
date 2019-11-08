export class Competency {
  id: number;
  skill_id: number;
  skill_name: string;
  level: number;

  constructor(id, skill_id, skill_name, level) {
    this.id = id;
    this.skill_id = skill_id;
    this.skill_name = skill_name;
    this.level = level;
  }

}
