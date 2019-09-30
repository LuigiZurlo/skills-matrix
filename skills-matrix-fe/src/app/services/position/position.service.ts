import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  uri = 'http://localhost:3000/v1';

  constructor(private http: HttpClient) { }

  getPositions() {
    return this.http.get(`${this.uri}/positions`);
  }

  getPositionsByProjectId(project_id) {
    return this.http.get(`${this.uri}/positions?project_id=${project_id}`);
  }

}
