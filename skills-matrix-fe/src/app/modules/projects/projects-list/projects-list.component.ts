import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {GetProjectsServiceResponse, Project} from '../../../common/models/project/project.model';
import {ProjectService} from '../../../services/project/project.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {

  projects: Project[];
  displayedColumns = ['name', 'start_date', 'end_date', 'actions'];

  constructor(private projectService: ProjectService, private router: Router) { }

  ngOnInit() {
    this.fetchProjects();
  }

  fetchProjects() {
    this.projectService.getProjects()
      .subscribe( (getProjectsServiceResponse: GetProjectsServiceResponse) => {
        this.projects = getProjectsServiceResponse.data;
        console.log('Data requested ...');
        console.log(this.projects);
      });
  }

  viewProject(id) {
    this.router.navigate([`/projects/${id}`]);
  }

  deleteProject(id) {
    this.projectService
      .deleteProject(id)
      .subscribe(() => {
        this.fetchProjects();
      });
  }

}
