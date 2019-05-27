import { Component, OnInit } from '@angular/core';
import {GetProjectsServiceResponse, Project} from "../../../models/project/project.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../../../services/project/project.service";

@Component({
  selector: 'app-projects-view',
  templateUrl: './projects-view.component.html',
  styleUrls: ['./projects-view.component.css']
})
export class ProjectsViewComponent implements OnInit {

  projectId: string;
  project: Project;

  constructor(private projectService: ProjectService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.projectId = this.activatedRoute.snapshot.paramMap.get('id')
    this.fetchProject(this.projectId);
  }

  fetchProject(id) {
    this.projectService
      .getProjectById(id)
      .subscribe( (getProjectByIdResponse: GetProjectsServiceResponse) => {
        this.project = getProjectByIdResponse.data;
        console.log('Data requested ...');
        console.log(this.project);
      })
  }

  editProject(id) {
    this.router.navigate([`/projects/${id}/edit`]);
  }

  deleteProject(id) {
    this.projectService
      .deleteProject(id)
      .subscribe(() => {
        this.router.navigate([`/projects`]);
      });
  }

}
