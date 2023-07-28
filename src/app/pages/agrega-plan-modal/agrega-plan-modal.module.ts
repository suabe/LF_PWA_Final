import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregaPlanModalPageRoutingModule } from './agrega-plan-modal-routing.module';

import { AgregaPlanModalPage } from './agrega-plan-modal.page';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregaPlanModalPageRoutingModule,
    ComponentsModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  declarations: [AgregaPlanModalPage]
})
export class AgregaPlanModalPageModule {}
