import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

import {MaterialModule} from './material.module';

// Modules
import {PositionsModule} from './positions/positions.module';
import {ProjectsModule} from './projects/projects.module';
import {ResourcesModule} from './resources/resources.module';
import {SkillsModule} from './skills/skills.module';

// Services
import {ProjectService} from "./services/project/project.service";
import {ResourceService} from './services/resource/resource.service';
import {SkillService} from './services/skill/skill.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,

    PositionsModule,
    ProjectsModule,
    ResourcesModule,
    SkillsModule,

    // AppRoutingModule *MUST* be imported last:
    AppRoutingModule
  ],
  providers: [
    SkillService,
    ResourceService,
    ProjectService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
