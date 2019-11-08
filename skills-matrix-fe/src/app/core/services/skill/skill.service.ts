import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  uri = 'http://localhost:3000/v1';

  constructor(private http: HttpClient) {
  }

  getSkills() {
    return this.http.get<any>(`${this.uri}/skills`);
  }

  getSkillById(id) {
    return this.http.get(`${this.uri}/skills/${id}`);
  }

  /*addSkill(name) {
    const skill = {
      name: name,
      //display_name: name
    };
    return this.http.post(`${this.uri}/skills/add`, skill);
  }*/

  addSkill(name): Observable<any> {
    const skill = {
      name: name
    };
    console.log('added Skill', skill);
    return this.http.post(`${this.uri}/skills`, skill);
  }

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
