import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ProjectsCreateComponent} from "./projects-create/projects-create.component";
import {ProjectsEditComponent} from "./projects-edit/projects-edit.component";
import {ProjectsViewComponent} from "./projects-view/projects-view.component";
import {ProjectsListComponent} from "./projects-list/projects-list.component";

const projectsRoutes: Routes = [
  { path: 'projects/create', component: ProjectsCreateComponent },
  { path: 'projects/:id/edit', component: ProjectsEditComponent },
  { path: 'projects/:id', component: ProjectsViewComponent },
  { path: 'projects', component: ProjectsListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(projectsRoutes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
