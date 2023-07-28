import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CallRateImproverPageRoutingModule } from './call-rate-improver-routing.module';

import { CallRateImproverPage } from './call-rate-improver.page';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CallRateImproverPageRoutingModule,
    TranslateModule,
    NgbModule,
    ReactiveFormsModule
  ],
  declarations: [CallRateImproverPage]
})
export class CallRateImproverPageModule {}
