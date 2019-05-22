import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SkillsListComponent } from './components/skills/skills-list/skills-list.component';
import { SkillsCreateComponent } from './components/skills/skills-create/skills-create.component';
import { SkillsEditComponent } from './components/skills/skills-edit/skills-edit.component';

import { ProjectsListComponent } from './components/projects/projects-list/projects-list.component';
import { ProjectsCreateComponent } from './components/projects/projects-create/projects-create.component';
import { ProjectsEditComponent } from './components/projects/projects-edit/projects-edit.component';

import { ResourcesListComponent } from './components/resources/resources-list/resources-list.component';
import { ResourcesCreateComponent } from './components/resources/resources-create/resources-create.component';
import { ResourcesEditComponent } from './components/resources/resources-edit/resources-edit.component';

import { PositionsListComponent } from './components/positions/positions-list/positions-list.component';
import { PositionsCreateComponent } from './components/positions/positions-create/positions-create.component';
import { PositionsEditComponent } from './components/positions/positions-edit/positions-edit.component';

const routes: Routes = [

  { path: 'skills/create', component: SkillsCreateComponent },
  { path: 'skills/:id/edit/', component: SkillsEditComponent },
  { path: 'skills', component: SkillsListComponent },

  { path: 'projects/create', component: ProjectsCreateComponent },
  { path: 'projects/:id/edit', component: ProjectsEditComponent },
  { path: 'projects', component: ProjectsListComponent },

  { path: 'resources/create', component: ResourcesCreateComponent },
  { path: 'resources/:id/edit', component: ResourcesEditComponent },
  { path: 'resources', component: ResourcesListComponent },

  { path: 'positions/create', component: PositionsCreateComponent },
  { path: 'positions/:id/edit', component: PositionsEditComponent },
  { path: 'positions', component: PositionsListComponent },

  { path: '', redirectTo: '/', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
