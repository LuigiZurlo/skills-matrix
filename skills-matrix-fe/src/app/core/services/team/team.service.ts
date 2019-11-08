import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  uri = 'http://localhost:3000/v1';

  constructor(private http: HttpClient) { }

  getTeams() {
    return this.http.get(`${this.uri}/teams`);
  }

  getTeamById(id) {
    return this.http.get(`${this.uri}/teams/${id}`);
  }

  getTeamsByProjectId(id) {
    return this.http.get(`${this.uri}/teams?project_id=${id}`);
  }

  // addTeam (name) {
  //   const team = {
  //     name: name,
  //     display_name: name
  //   };
  //   return this.http.post(`${this.uri}/skills/add`, skill);
  // }
  //
  // retrieveSkills (ids) {
  //   return this.http.post(`${this.uri}/skills/retrieve`, ids);
  // }
  //
  // updateSkill (id, name) {
  //   const skill = {
  //     name: name,
  //     display_name: name
  //   };
  //   return this.http.post(`${this.uri}/skills/${id}/update`, skill);
  // }

  deleteTeam(id) {
    return this.http.delete(`${this.uri}/teams/${id}`);
  }

}
