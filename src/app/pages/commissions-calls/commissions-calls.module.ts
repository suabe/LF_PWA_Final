import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommissionsCallsPageRoutingModule } from './commissions-calls-routing.module';

import { CommissionsCallsPage } from './commissions-calls.page';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommissionsCallsPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [CommissionsCallsPage]
})
export class CommissionsCallsPageModule {}
