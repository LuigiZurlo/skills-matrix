import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ResourceService} from '../../../../core/services/resource/resource.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-resources-create',
  templateUrl: './resources-create.component.html',
  styleUrls: ['./resources-create.component.css']
})
export class ResourcesCreateComponent implements OnInit {

  createForm: FormGroup;

  constructor(private resourceService: ResourceService, private router: Router, private formBuilder: FormBuilder) {
    this.createForm = this.formBuilder.group( {
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      employee_number: ['', Validators.required],
      email: ['', Validators.required],
      }
    );
  }
  ngOnInit() {
  }

  // tslint:disable-next-line:variable-name
  addResource(first_name, last_name, employee_number, email){
    this.resourceService.createResource(first_name, last_name, employee_number, email).subscribe( () => {
      this.router.navigate(['/resources']);
    });
  }
}
