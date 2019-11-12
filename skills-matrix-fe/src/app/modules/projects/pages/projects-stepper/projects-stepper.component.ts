import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ProjectsCreateComponent} from "../projects-create/projects-create.component";
import {PositionsCreateComponent} from "../../../positions/pages/positions-create/positions-create.component";

@Component({
  selector: 'app-projects-stepper',
  templateUrl: './projects-stepper.component.html',
  styleUrls: ['./projects-stepper.component.css']
})
export class ProjectsStepperComponent implements OnInit {

  @ViewChild(ProjectsCreateComponent, {static: true}) createProject: ProjectsCreateComponent;
  @ViewChild(PositionsCreateComponent, {static: true}) createPosition: PositionsCreateComponent;

  project_id: string;

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

}
