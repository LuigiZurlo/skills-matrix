import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MissionsRoutingModule } from './missions-routing.module';
import { MissionsListComponent } from './missions-list/missions-list.component';
import { MissionsViewComponent } from './missions-view/missions-view.component';
import { MissionsCreateComponent } from './missions-create/missions-create.component';
import { MissionsDeleteComponent } from './missions-delete/missions-delete.component';


@NgModule({
  declarations: [MissionsListComponent, MissionsViewComponent, MissionsCreateComponent, MissionsDeleteComponent],
  imports: [
    CommonModule,
    MissionsRoutingModule
  ]
})
export class MissionsModule { }
