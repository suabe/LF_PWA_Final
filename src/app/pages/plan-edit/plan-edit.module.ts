import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanEditPageRoutingModule } from './plan-edit-routing.module';

import { PlanEditPage } from './plan-edit.page';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanEditPageRoutingModule,
    ComponentsModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  declarations: [PlanEditPage]
})
export class PlanEditPageModule {}
