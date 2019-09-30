import {Component, OnInit} from '@angular/core';
import {GetProjectsServiceResponse} from "../../../common/models/project/project.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../../../services/project/project.service";
import {PositionService} from "../../../services/position/position.service";
import {GetPositionsServiceResponse} from "../../../common/models/position/position.model";

@Component({
  selector: 'app-projects-view',
  templateUrl: './projects-view.component.html',
  styleUrls: ['./projects-view.component.css']
})
export class ProjectsViewComponent implements OnInit {

  projectId: string;

  project: any;
  positions: any;
  teams: any;

  // displayedColumnsForResources = ['employee_number', 'last_name', 'first_name', 'actions'];
  // displayedColumnsForProjectTeams = ['name', 'actions'];
  displayedColumnsForPositions = ['name', 'actions'];

  constructor(private projectService: ProjectService,
              private positionService: PositionService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.projectId = this.activatedRoute.snapshot.paramMap.get('id');
    this.fetchProject(this.projectId);
    this.fetchPositions(this.projectId);
  }

  fetchProject(id) {
    this.projectService
      .getProjectById(id)
      .subscribe((getProjectByIdResponse: GetProjectsServiceResponse) => {
        this.project = getProjectByIdResponse.data;
        console.log('Data requested: Project infos');
        console.log(this.project);
      })
  }

  fetchPositions(id) {
    this.positionService
      .getPositionsByProjectId(id)
      .subscribe((getPositionsByProjectIdResponse: GetPositionsServiceResponse) => {
        this.positions = getPositionsByProjectIdResponse.data;
        console.log('Data requested: Project Positions');
        console.log(this.positions);
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

  viewResource(id) {
    this.router.navigate([`/resources/${id}`]);
  }

}
