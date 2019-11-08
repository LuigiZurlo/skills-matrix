import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

import {MaterialModule} from './material.module';
// Modules
import {MatricesModule} from './modules/matrices/matrices.module';
import {PositionsModule} from './modules/positions/positions.module';
import {ProjectsModule} from './modules/projects/projects.module';
import {ResourcesModule} from './modules/resources/resources.module';
import {SkillsModule} from './modules/skills/skills.module';
// Services
import {ProjectService} from './core/services/project/project.service';
import {ResourceService} from './core/services/resource/resource.service';
import {SkillService} from './core/services/skill/skill.service';
import {MissionsModule} from './modules/missions/missions.module';
import {PositionService} from './core/services/position/position.service';
import {AppDashboardComponent} from './core/components/app-dashboard/app-dashboard.component';
import {FormsModule} from './modules/forms/forms.module';

@NgModule({
  declarations: [AppComponent, AppDashboardComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,

    MatricesModule,
    PositionsModule,
    ProjectsModule,
    ResourcesModule,
    SkillsModule,
    MissionsModule,
    FormsModule,

    // AppRoutingModule *MUST* be imported last:
    AppRoutingModule
  ],
  providers: [
    SkillService,
    ResourceService,
    ProjectService,
    PositionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
