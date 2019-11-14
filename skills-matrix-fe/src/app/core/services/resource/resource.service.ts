import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  uri = 'http://localhost:3000/v1';

  constructor(private http: HttpClient) {
  }

  getResources() {
    return this.http.get(`${this.uri}/resources`);
  }

  getResourceById(id) {
    return this.http.get(`${this.uri}/resources/${id}`);
  }

  getResourcesByProjectId(project_id) {
    return this.http.get(`${this.uri}/resources?project_id=${project_id}`);
  }

  getResourcesByTeamId(team_id) {
    return this.http.get(`${this.uri}/resources?team_id=${team_id}`);
  }

  deleteResource(id) {
    return this.http.delete(`${this.uri}/resources/${id}`);
  }

  createResource(first_name, last_name, employee_number, email): Observable<any> {
    const resource = {
      first_name: first_name,
      last_name: last_name,
      employee_number: employee_number,
      email: email
    };
    console.log('added Resource', resource);
    return this.http.post(`${this.uri}/resources`, resource);
  }

  getResourceCompetencies(id) {
    return this.http.get('${this.uri}/resources/${id}/competencies');
  }

  createResourceCompetency(resource_id, competency_id, assessed_on, validation_date, validator_id) {
    const res = {
      resource_id: Number(resource_id),
      competency_id: competency_id,
      assessed_on: assessed_on,
      validation_date: validation_date,
      validator_id: validator_id,
      is_validated: 'false',
      is_pending_validation: 'true'
    };
    console.log('added ResourceCompetency', res);
    return this.http.post(`${this.uri}/resources/${resource_id}/competencies`, res);
  }

}
