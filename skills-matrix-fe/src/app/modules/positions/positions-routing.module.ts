import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PositionsCreateComponent} from "./positions-create/positions-create.component";
import {PositionsEditComponent} from "./positions-edit/positions-edit.component";
import {PositionsListComponent} from "./positions-list/positions-list.component";
import {PositionsViewComponent} from "./positions-view/positions-view.component";

const positionsRoutes: Routes = [

  { path: 'positions', component: PositionsListComponent },
  { path: 'positions/:id', component: PositionsViewComponent },
  { path: 'positions/:id/edit', component: PositionsEditComponent },
  { path: 'positions/create', component: PositionsCreateComponent }

];

@NgModule({
  imports: [RouterModule.forChild(positionsRoutes)],
  exports: [RouterModule]
})
export class PositionsRoutingModule { }
