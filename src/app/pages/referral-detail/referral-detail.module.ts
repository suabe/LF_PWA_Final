import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReferralDetailPageRoutingModule } from './referral-detail-routing.module';

import { ReferralDetailPage } from './referral-detail.page';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReferralDetailPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [ReferralDetailPage]
})
export class ReferralDetailPageModule {}
