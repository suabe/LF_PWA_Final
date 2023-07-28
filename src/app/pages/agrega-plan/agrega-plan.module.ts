import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregaPlanPageRoutingModule } from './agrega-plan-routing.module';

import { AgregaPlanPage } from './agrega-plan.page';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { AgregaPlanModalPage } from '../agrega-plan-modal/agrega-plan-modal.page';
import { AgregaPlanModalPageModule } from '../agrega-plan-modal/agrega-plan-modal.module';

@NgModule({
  entryComponents: [
    AgregaPlanModalPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregaPlanPageRoutingModule,
    ComponentsModule,
    TranslateModule,
    AgregaPlanModalPageModule
  ],
  declarations: [AgregaPlanPage]
})
export class AgregaPlanPageModule {}
