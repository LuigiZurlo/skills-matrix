import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatricesViewComponent} from './matrices-view/matrices-view.component';

const routes: Routes = [

  { path: 'matrices', component: MatricesViewComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatricesRoutingModule { }
