import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MissionsRoutingModule } from './missions-routing.module';
import { MissionsViewComponent } from './missions-view/missions-view.component';
import { MissionsCreateComponent } from './missions-create/missions-create.component';
import { MissionsDeleteComponent } from './missions-delete/missions-delete.component';
import {MaterialModule} from "../../material.module";


@NgModule({
  declarations: [
    MissionsViewComponent,
    MissionsCreateComponent,
    MissionsDeleteComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MissionsRoutingModule
  ]
})
export class MissionsModule { }
