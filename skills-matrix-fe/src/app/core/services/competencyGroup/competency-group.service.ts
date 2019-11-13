import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompetencyGroupService {

  uri = 'http://localhost:3000/v1';

  constructor(private http: HttpClient) {
  }

  getCompetencyGroups(): Observable<any> {
    return this.http.get<any>(`${this.uri}/competency_groups/`);
  }

  createCompetencyGroup(position_id, name): Observable<any> {
    const competencyGroup = {
      position_id: position_id,
      name: name
    };
    console.log('added CompetencyGroup', competencyGroup);
    return this.http.post(`${this.uri}/competency_groups/`, competencyGroup, {
      responseType: 'json',
      observe: 'response'
    });
  }

  getCompetencyGroupById(id): Observable<any> {
    return this.http.get(`${this.uri}/compentecy_groups/${id}`);
  }


}
