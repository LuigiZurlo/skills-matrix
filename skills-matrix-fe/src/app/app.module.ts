import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';

import { SkillsListComponent } from './components/skills/skills-list/skills-list.component';
import { SkillsCreateComponent } from './components/skills/skills-create/skills-create.component';
import { SkillsEditComponent } from './components/skills/skills-edit/skills-edit.component';
import { SkillsDeleteComponent } from './components/skills/skills-delete/skills-delete.component';
import { SkillsViewComponent } from './components/skills/skills-view/skills-view.component';

import { ResourcesListComponent } from './components/resources/resources-list/resources-list.component';
import { ResourcesEditComponent } from './components/resources/resources-edit/resources-edit.component';
import { ResourcesCreateComponent } from './components/resources/resources-create/resources-create.component';
import { ResourcesDeleteComponent } from './components/resources/resources-delete/resources-delete.component';

import { ProjectsListComponent } from './components/projects/projects-list/projects-list.component';
import { ProjectsEditComponent } from './components/projects/projects-edit/projects-edit.component';
import { ProjectsCreateComponent } from './components/projects/projects-create/projects-create.component';
import { ProjectsDeleteComponent } from './components/projects/projects-delete/projects-delete.component';

import { PositionsListComponent } from './components/positions/positions-list/positions-list.component';
import { PositionsCreateComponent } from './components/positions/positions-create/positions-create.component';
import { PositionsEditComponent } from './components/positions/positions-edit/positions-edit.component';
import { PositionsDeleteComponent } from './components/positions/positions-delete/positions-delete.component';

import { SkillService } from './services/skill/skill.service';

@NgModule({
  declarations: [
    AppComponent,

    SkillsListComponent,
    SkillsCreateComponent,
    SkillsEditComponent,
    SkillsDeleteComponent,
    SkillsViewComponent,

    ResourcesListComponent,
    ResourcesEditComponent,
    ResourcesCreateComponent,
    ResourcesDeleteComponent,

    ProjectsListComponent,
    ProjectsEditComponent,
    ProjectsCreateComponent,
    ProjectsDeleteComponent,

    PositionsListComponent,
    PositionsCreateComponent,
    PositionsEditComponent,
    PositionsDeleteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    SkillService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
