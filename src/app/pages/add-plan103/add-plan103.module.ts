import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPlan103PageRoutingModule } from './add-plan103-routing.module';

import { AddPlan103Page } from './add-plan103.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPlan103PageRoutingModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  declarations: [AddPlan103Page]
})
export class AddPlan103PageModule {}
