import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-positions-create',
  templateUrl: './positions-create.component.html',
  styleUrls: ['./positions-create.component.css']
})
export class PositionsCreateComponent implements OnInit {

  positionCreateForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
      this.positionCreateForm = new FormGroup({
        skill: new FormControl(),
        level: new FormControl()
      });
  }

  ngOnInit() {
  }

}
