import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ProjectsCreateComponent} from "./pages/projects-create/projects-create.component";
import {ProjectsEditComponent} from "./pages/projects-edit/projects-edit.component";
import {ProjectsViewComponent} from "./pages/projects-view/projects-view.component";
import {ProjectsListComponent} from "./pages/projects-list/projects-list.component";
import {ProjectsDeleteComponent} from "./pages/projects-delete/projects-delete.component";
import {ProjectsStepperComponent} from "./pages/projects-stepper/projects-stepper.component";

const projectsRoutes: Routes = [
  { path: 'projects/create', component: ProjectsStepperComponent },
  { path: 'projects/:id/edit', component: ProjectsEditComponent },
  { path: 'projects/:id', component: ProjectsViewComponent },
  { path: 'projects', component: ProjectsListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(projectsRoutes)],
  exports: [RouterModule]
})

export class ProjectsRoutingModule { }
