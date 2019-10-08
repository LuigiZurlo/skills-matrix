import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppDashboardComponent} from "./app-dashboard/app-dashboard.component";

const routes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: AppDashboardComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
