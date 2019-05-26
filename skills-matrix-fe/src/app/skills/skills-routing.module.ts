import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SkillsListComponent } from './skills-list/skills-list.component';
import { SkillsCreateComponent } from './skills-create/skills-create.component';
import { SkillsEditComponent } from './skills-edit/skills-edit.component';
import { SkillsViewComponent } from './skills-view/skills-view.component';

const skillsRoutes: Routes = [

  { path: 'skills/create', component: SkillsCreateComponent },
  { path: 'skills/:id', component: SkillsViewComponent },
  { path: 'skills/:id/edit', component: SkillsEditComponent },
  { path: 'skills', component: SkillsListComponent },

  { path: '', redirectTo: '/', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forChild(skillsRoutes)],
  exports: [RouterModule]
})
export class SkillsRoutingModule { }
