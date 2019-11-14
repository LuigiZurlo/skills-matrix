import {Component, OnInit} from '@angular/core';
import {GetProjectsServiceResponse} from "../../../../core/models/project/project.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../../../../core/services/project/project.service";
import {PositionService} from "../../../../core/services/position/position.service";
import {GetPositionsServiceResponse} from '../../../../core/models/position/position.model';
import {TeamService} from '../../../../core/services/team/team.service';
import {ResourceService} from '../../../../core/services/resource/resource.service';
import {projects} from "../../../../../../../skills-matrix-be/src/db/models/ALL";

@Component({
  selector: 'app-projects-view',
  templateUrl: './projects-view.component.html',
  styleUrls: ['./projects-view.component.css']
})
export class ProjectsViewComponent implements OnInit {

  projectId: string;
  project: projects;
  positions: any[];
  teams: any;
  resources: any;

  displayedColumnsForResources = ['employee_number', 'last_name', 'first_name', 'actions'];
  displayedColumnsForProjectTeams = ['name', 'actions'];
  displayedColumnsForPositions = ['name', 'actions'];

  constructor(private projectService: ProjectService,
              private positionService: PositionService,
              private resourceService: ResourceService,
              private teamService: TeamService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.projectId = this.activatedRoute.snapshot.paramMap.get('id');
    this.fetchProject(this.projectId);
    this.fetchPositions(this.projectId);
    this.fetchTeams(this.projectId);
    this.fetchResources(this.projectId);
  }

  ngOnInit() {

  }

  fetchTeams(id) {
    this.teamService
      .getTeamsByProjectId(id)
      .subscribe((response: any) => {
        this.teams = response.data;
        console.log('Data requested: Teams infos');
        console.log(this.teams);
      });
  }

  fetchResources(id) {
    this.resourceService
      .getResourcesByProjectId(id)
      .subscribe((response: any) => {
        this.resources = response.data;
        console.log('Data requested: Resources infos');
        console.log(this.resources);
      });
  }

  fetchProject(id) {
    this.projectService
      .getProjectById(id)
      .subscribe((getProjectByIdResponse: GetProjectsServiceResponse) => {
        this.project = getProjectByIdResponse.data[0];
        console.log('Data requested: Project infos');
        console.log(this.project);
      });
  }

  fetchPositions(id) {
    this.positionService
      .getPositionsByProjectId(id)
      .subscribe((getPositionsByProjectIdResponse: GetPositionsServiceResponse) => {
        this.positions = getPositionsByProjectIdResponse.data;
        console.log('Data requested: Project Positions');
        console.log(this.positions);
      });
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

  viewPosition(id) {
    this.router.navigate([`/positions/${id}`]);
  }

}
