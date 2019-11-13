import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  uri = 'http://localhost:3000/v1';

  constructor(private http: HttpClient) { }

  getPositions() {
    return this.http.get(`${this.uri}/positions`);
  }

  getPositionById(id) {
    return this.http.get(`${this.uri}/positions/${id}`);
  }

  createPosition(project_id, name, description) {
    const position = {
      name: name,
      project_id: project_id,
      description: description
    };
    console.log("added Position", position);
    return this.http.post(`${this.uri}/positions`, position, {responseType: 'json', observe: 'response'});
  }

  getPositionsByProjectId(project_id) {
    return this.http.get(`${this.uri}/positions?project_id=${project_id}`);
  }

  deletePosition(id) {
    return this.http.delete(`${this.uri}/positions/${id}`);
  }

}
