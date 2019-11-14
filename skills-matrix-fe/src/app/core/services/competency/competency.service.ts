import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CompetencyService {

  uri = 'http://localhost:3000/v1';

  constructor(private http: HttpClient) {
  }

  getCompetencies() {
    return this.http.get(`${this.uri}/competencies`);
  }

  getCompetenciesBySkill(skill_id, level) {
    return this.http.get(`${this.uri}/competencies?skill_id=${skill_id}&level=${level}`);
  }

}
