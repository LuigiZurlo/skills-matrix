import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PositionsCreateComponent} from "./pages/positions-create/positions-create.component";
import {PositionsEditComponent} from "./pages/positions-edit/positions-edit.component";
import {PositionsViewComponent} from "./pages/positions-view/positions-view.component";
import {PositionsListComponent} from "./pages/positions-list/positions-list.component";

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
