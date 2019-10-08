import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MaterialModule} from '../../material.module';

import {ResourcesRoutingModule} from './resources-routing.module';

import {ResourcesCreateComponent} from './resources-create/resources-create.component';
import {ResourcesDeleteComponent} from './resources-delete/resources-delete.component';
import {ResourcesEditComponent} from './resources-edit/resources-edit.component';
import {ResourcesListComponent} from './resources-list/resources-list.component';
import {ResourcesViewComponent} from './resources-view/resources-view.component';

@NgModule({
  declarations: [
    ResourcesCreateComponent,
    ResourcesDeleteComponent,
    ResourcesEditComponent,
    ResourcesListComponent,
    ResourcesViewComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,

    ResourcesRoutingModule
  ]
})
export class ResourcesModule { }
