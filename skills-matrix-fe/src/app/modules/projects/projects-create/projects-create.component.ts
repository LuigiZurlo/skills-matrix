import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from "../../../services/project/project.service";

@Component({
  selector: 'app-projects-create',
  templateUrl: './projects-create.component.html',
  styleUrls: ['./projects-create.component.css']
})
export class ProjectsCreateComponent implements OnInit {

  createForm: FormGroup;

  constructor(private projectService: ProjectService, private router: Router, private formBuilder: FormBuilder) {
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      start_date: [ Date , Validators.required],
      end_date: [ Date , Validators.required]
    });
  }

  ngOnInit() {
  }

  addProject(name, startDate, endDate) {
    this.projectService.addProject(name, startDate, endDate).subscribe( () => {
        this.router.navigate([`/projects`]);
      })
  }

}
