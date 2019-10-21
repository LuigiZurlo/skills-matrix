import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {MaterialModule} from "../../material.module";

import {SkillsCreateComponent} from './pages/skills-create/skills-create.component';
import {SkillsDeleteComponent} from './pages/skills-delete/skills-delete.component';
import {SkillsEditComponent} from './pages/skills-edit/skills-edit.component';
import {SkillsListComponent} from './pages/skills-list/skills-list.component';
import {SkillsViewComponent} from './pages/skills-view/skills-view.component';

import {SkillsRoutingModule} from "./skills-routing.module";

@NgModule({
  declarations: [
    SkillsCreateComponent,
    SkillsDeleteComponent,
    SkillsEditComponent,
    SkillsListComponent,
    SkillsViewComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SkillsRoutingModule
  ]
})
export class SkillsModule { }
