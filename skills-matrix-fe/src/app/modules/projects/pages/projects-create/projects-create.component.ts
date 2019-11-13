import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ProjectService} from '../../../../core/services/project/project.service';

@Component({
  selector: 'app-projects-create',
  templateUrl: './projects-create.component.html',
  styleUrls: ['./projects-create.component.css']
})
export class ProjectsCreateComponent implements OnInit {

  createForm: FormGroup;
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();

  constructor(private projectService: ProjectService, private router: Router, private formBuilder: FormBuilder) {
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      project_otp_code: ['', Validators.required],
      start_date: [Date, Validators.required],
      end_date: [Date, Validators.required]
    });
  }

  ngOnInit() {
  }

  addProject(name, project_otp_code, start_date, end_date) {
    const k = this.projectService.createProject(name, project_otp_code, start_date, end_date).subscribe(projectIds => {
     this.notify.emit(JSON.parse(JSON.stringify(projectIds.body.data[0])));
      /*this.router.navigate([`/projects`]);*/
    });
  }



}
