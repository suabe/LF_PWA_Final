import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CallRatePageRoutingModule } from './call-rate-routing.module';

import { CallRatePage } from './call-rate.page';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CallRatePageRoutingModule,
    ComponentsModule,
    TranslateModule,
    NgbModule,
    ReactiveFormsModule
  ],
  declarations: [CallRatePage]
})
export class CallRatePageModule {}
