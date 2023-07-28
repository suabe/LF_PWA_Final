import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommissionsPageRoutingModule } from './commissions-routing.module';

import { CommissionsPage } from './commissions.page';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommissionsPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [CommissionsPage]
})
export class CommissionsPageModule {}
