import { Injectable } from '@angular/core';
import {ProjectService} from "./project.service";
import {ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import { Observable, of, EMPTY }  from 'rxjs';
import { mergeMap, take }         from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectDetailResolverService implements Resolve<any> {

  constructor(private projectService: ProjectService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {
    let id = route.paramMap.get('id');
    return this.projectService.getProjectById(id).pipe(
      take(1),
      mergeMap(project => {
        if (project) {
          return of(project);
        } else { // id not found
          this.router.navigate(['/projects']);
          return EMPTY;
        }
      })
    );
  }

}
