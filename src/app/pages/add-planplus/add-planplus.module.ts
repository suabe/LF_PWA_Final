import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPlanplusPageRoutingModule } from './add-planplus-routing.module';

import { AddPlanplusPage } from './add-planplus.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPlanplusPageRoutingModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  declarations: [AddPlanplusPage]
})
export class AddPlanplusPageModule {}
