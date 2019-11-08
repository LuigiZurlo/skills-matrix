import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MissionsViewComponent} from "./pages/missions-view/missions-view.component";
import {MissionsDeleteComponent} from "./pages/missions-delete/missions-delete.component";
import {MissionsCreateComponent} from "./pages/missions-create/missions-create.component";
import {MissionsListComponent} from "./pages/missions-list/missions-list.component";


const routes: Routes = [

  { path: 'missions/create', component: MissionsCreateComponent },
  { path: 'missions/:id', component: MissionsViewComponent },
  { path: 'missions/:id/delete', component: MissionsDeleteComponent },
  { path: 'missions', component: MissionsListComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MissionsRoutingModule { }
