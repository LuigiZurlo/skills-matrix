import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {MaterialModule} from "../material.module";

import {SkillsCreateComponent} from './skills-create/skills-create.component';
import {SkillsDeleteComponent} from './skills-delete/skills-delete.component';
import {SkillsEditComponent} from './skills-edit/skills-edit.component';
import {SkillsListComponent} from './skills-list/skills-list.component';
import {SkillsViewComponent} from './skills-view/skills-view.component';

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
