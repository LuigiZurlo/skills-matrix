import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ResourcesCreateComponent} from './pages/resources-create/resources-create.component';
import {ResourcesEditComponent} from './pages/resources-edit/resources-edit.component';
import {ResourcesListComponent} from './pages/resources-list/resources-list.component';
import {ResourcesViewComponent} from './pages/resources-view/resources-view.component';

const resourcesRoutes: Routes = [

  { path: 'resources', component: ResourcesListComponent },
  { path: 'resources/:id', component: ResourcesViewComponent },
  { path: 'resources/:id/edit', component: ResourcesEditComponent },
  { path: 'resources/create', component: ResourcesCreateComponent }

];

@NgModule({
  imports: [RouterModule.forChild(resourcesRoutes)],
  exports: [RouterModule]
})
export class ResourcesRoutingModule { }
