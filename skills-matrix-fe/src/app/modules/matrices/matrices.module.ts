import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MatricesRoutingModule} from './matrices-routing.module';
import {MatricesViewComponent} from './matrices-view/matrices-view.component';
import {MaterialModule} from '../../material.module';
import {CdkTableModule} from '@angular/cdk/table';

@NgModule({
  declarations: [MatricesViewComponent],
  imports: [
    CommonModule,
    MaterialModule,
    CdkTableModule,
    MatricesRoutingModule
  ]
})
export class MatricesModule {
}
