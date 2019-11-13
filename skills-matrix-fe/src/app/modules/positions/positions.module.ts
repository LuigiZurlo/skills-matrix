import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MaterialModule} from '../../material.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {PositionsRoutingModule} from './positions-routing.module';

import {PositionsCreateComponent} from './pages/positions-create/positions-create.component';
import {PositionsDeleteComponent} from './pages/positions-delete/positions-delete.component';
import {PositionsEditComponent} from './pages/positions-edit/positions-edit.component';
import { PositionsViewComponent } from './pages/positions-view/positions-view.component';
import { PositionsListComponent } from './pages/positions-list/positions-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { PositionsStepperCreateComponent } from './pages/positions-stepper-create/positions-stepper-create.component';
import { PositionsRequirementComponent } from './pages/positions-requirement/positions-requirement.component';

@NgModule({
  declarations: [
    PositionsCreateComponent,
    PositionsDeleteComponent,
    PositionsEditComponent,
    PositionsViewComponent,
    PositionsListComponent,
    PositionsStepperCreateComponent,
    PositionsRequirementComponent
  ],
  exports: [
    PositionsStepperCreateComponent,
    PositionsRequirementComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,

    MatTableModule,
    MatPaginatorModule,
    MatSortModule,

    PositionsRoutingModule
  ]
})
export class PositionsModule { }
