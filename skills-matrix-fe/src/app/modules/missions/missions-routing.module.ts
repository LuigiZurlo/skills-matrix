import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MissionsViewComponent} from "./missions-view/missions-view.component";
import {MissionsDeleteComponent} from "./missions-delete/missions-delete.component";
import {MissionsCreateComponent} from "./missions-create/missions-create.component";


const routes: Routes = [

  { path: 'missions/create', component: MissionsCreateComponent },
  { path: 'missions/:id', component: MissionsViewComponent },
  { path: 'missions/:id/delete', component: MissionsDeleteComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MissionsRoutingModule { }
