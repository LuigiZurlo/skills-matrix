import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  uri = 'http://localhost:3000/v1';

  constructor(private http: HttpClient) {
  }

  getMissions() {
    return this.http.get(`${this.uri}/missions`);
  }

  getMissionById(id) {
    return this.http.get(`${this.uri}/missions/${id}`);
  }

  /*createMission(project_id, name, description) {
    const position = {
      name: name,
      project_id: project_id,
      description: description
    };
    console.log("added Position", position);
    return this.http.post(`${this.uri}/positions`, position);
  }*/

  // tslint:disable-next-line:variable-name
  createMission(resource_id, project_id, position_id, start_date, end_date) {
    const mission = {
        resource_id: resource_id,
        project_id: project_id,
        position_id: position_id,
        start_date: start_date,
        end_date: end_date
      }
    ;
    console.log('added Mission', mission);
    return this.http.post(`${this.uri}/missions`, mission);
  }

  getMissionsByProjectId(project_id) {
    return this.http.get(`${this.uri}/missions?project_id=${project_id}`);
  }

  deleteMission(id) {
    return this.http.delete(`${this.uri}/missions/${id}`);
  }

}
