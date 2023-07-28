import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommissionsReferralsPageRoutingModule } from './commissions-referrals-routing.module';

import { CommissionsReferralsPage } from './commissions-referrals.page';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommissionsReferralsPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [CommissionsReferralsPage]
})
export class CommissionsReferralsPageModule {}
