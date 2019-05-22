import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  uri = 'http://localhost:3000/v1';

  constructor(private http: HttpClient) { }

    getSkills() {
      return this.http.get(`${this.uri}/skills`);
    }

    // getSkillById (id) {
    //   return this.http.get(`${this.uri}/skills/${id}`)
    // }
    //
    // addSkill (name) {
    //   const skill = {
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

    deleteSkill(id) {
      return this.http.delete(`${this.uri}/skills/${id}`);
    }

}
