import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MaterialModule} from '../material.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {PositionsRoutingModule} from './positions-routing.module';

import {PositionsCreateComponent} from './positions-create/positions-create.component';
import {PositionsDeleteComponent} from './positions-delete/positions-delete.component';
import {PositionsEditComponent} from './positions-edit/positions-edit.component';
import {PositionsListComponent} from './positions-list/positions-list.component';

@NgModule({
  declarations: [
    PositionsCreateComponent,
    PositionsDeleteComponent,
    PositionsEditComponent,
    PositionsListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,

    PositionsRoutingModule
  ]
})
export class PositionsModule { }
