import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MaterialModule} from '../../material.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {PositionsRoutingModule} from './positions-routing.module';

import {PositionsCreateComponent} from './positions-create/positions-create.component';
import {PositionsDeleteComponent} from './positions-delete/positions-delete.component';
import {PositionsEditComponent} from './positions-edit/positions-edit.component';
import { PositionsViewComponent } from './positions-view/positions-view.component';
import { PositionsListComponent } from './positions-list/positions-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    PositionsCreateComponent,
    PositionsDeleteComponent,
    PositionsEditComponent,
    PositionsViewComponent,
    PositionsListComponent
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
