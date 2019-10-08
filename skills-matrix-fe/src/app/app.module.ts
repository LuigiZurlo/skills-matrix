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
import {ProjectService} from './services/project/project.service';
import {ResourceService} from './services/resource/resource.service';
import {SkillService} from './services/skill/skill.service';
import {MissionsModule} from "./modules/missions/missions.module";
import {PositionService} from "./services/position/position.service";
import { AppDashboardComponent } from './app-dashboard/app-dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';

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

    // AppRoutingModule *MUST* be imported last:
    AppRoutingModule,

    MatGridListModule,

    MatCardModule,

    MatMenuModule,

    MatIconModule,

    MatButtonModule,

    LayoutModule
  ],
  providers: [
    SkillService,
    ResourceService,
    ProjectService,
    PositionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
