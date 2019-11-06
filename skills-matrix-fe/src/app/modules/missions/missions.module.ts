import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MissionsRoutingModule } from './missions-routing.module';
import { MissionsViewComponent } from './pages/missions-view/missions-view.component';
import { MissionsCreateComponent } from './pages/missions-create/missions-create.component';
import { MissionsDeleteComponent } from './pages/missions-delete/missions-delete.component';
import {MaterialModule} from "../../material.module";
import { MissionsListComponent } from './pages/missions-list/missions-list.component';


@NgModule({
  declarations: [
    MissionsViewComponent,
    MissionsCreateComponent,
    MissionsDeleteComponent,
    MissionsListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MissionsRoutingModule
  ]
})
export class MissionsModule { }
