import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PositionService} from "../../../services/position/position.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-positions-create',
  templateUrl: './positions-create.component.html',
  styleUrls: ['./positions-create.component.css']
})
export class PositionsCreateComponent implements OnInit {

  positionCreateForm: FormGroup;
  projectId: number;
  sub: any;

  constructor(private _formBuilder: FormBuilder,
              private _location: Location,
              private _positionService: PositionService,
              private _router: Router,
              private _route: ActivatedRoute) {
    this.positionCreateForm = this._formBuilder.group({
      name: ['', Validators.required],
      description: ['']
    });
    this.sub = this._route.queryParams.subscribe(params => {
      this.projectId = +params['project_id'] || null;
    });
  }

  addPosition(name, description) {
    this._positionService.createPosition(this.projectId, name, description).subscribe( () => {
      this._router.navigate([`/projects/${this.projectId}`]);
    })
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  goBack() {
    this._location.back();
  }

}
