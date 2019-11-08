import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppDashboardComponent} from "./core/components/app-dashboard/app-dashboard.component";
import {PositionEditorComponent} from "./modules/forms/pages/position-editor/position-editor.component";

const routes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: AppDashboardComponent },
  { path: 'form', component: PositionEditorComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
