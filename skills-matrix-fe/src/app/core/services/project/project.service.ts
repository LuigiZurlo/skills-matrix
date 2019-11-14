import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  uri = 'http://localhost:3000/v1';

  constructor(private http: HttpClient) {
  }

  getProjects(): Observable<any> {
    return this.http.get<any>(`${this.uri}/projects`);
  }

  createProject(name, project_otp_code, start_date, end_date): Observable<any> {
    const project = {
      name: name,
      project_otp_code: project_otp_code,
      start_date: start_date,
      end_date: end_date
    };
    console.log("added Project", project);

    return this.http.post(`${this.uri}/projects`, project, {responseType: 'json', observe: 'response'});
  }

  getProjectById(id): Observable<any> {
    return this.http.get(`${this.uri}/projects/${id}`);
  }

  deleteProject(id): Observable<any> {
    return this.http.delete(`${this.uri}/projects/${id}`);
  }

}
