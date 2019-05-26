import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-positions-create',
  templateUrl: './positions-create.component.html',
  styleUrls: ['./positions-create.component.css']
})
export class PositionsCreateComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  projects = [
    { id: 0, name: "CBS RES OBE"},
    { id: 1, name: "CBS DES-PTO"}
    ];

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    })
  }

}
