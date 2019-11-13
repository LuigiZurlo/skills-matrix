import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ProjectsCreateComponent} from "../projects-create/projects-create.component";
import {PositionsStepperCreateComponent} from "../../../positions/pages/positions-stepper-create/positions-stepper-create.component";
import {PositionsRequirementComponent} from "../../../positions/pages/positions-requirement/positions-requirement.component";

@Component({
  selector: 'app-projects-stepper',
  templateUrl: './projects-stepper.component.html',
  styleUrls: ['./projects-stepper.component.css']
})
export class ProjectsStepperComponent implements OnInit {

  @ViewChild(ProjectsCreateComponent, {static: true}) createProject: ProjectsCreateComponent;
  @ViewChild(PositionsStepperCreateComponent, {static: true}) createPosition: PositionsStepperCreateComponent;
  @ViewChild(PositionsRequirementComponent, {static: true}) createPositionRequirement: PositionsRequirementComponent;


  @Input() projectId: string;
  @Input() positionID: string;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
  }

  get projectForm() {
    return this.createProject.createForm;
  }

  get positionForm() {
    return this.createPosition.positionCreateForm;
  }

  get positionRequirementForm() {
    return this.createPositionRequirement.positionForms;
  }

  onNotify(projectId: any): void {
    const k = JSON.parse(JSON.stringify(projectId));
    this.projectId = k.id;
  }

  getPositionName(positionName: any): void {
    const k = JSON.parse(JSON.stringify(positionName));
    this.positionID = k.body.data[0].id;
  }

}
