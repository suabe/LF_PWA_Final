import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroPlanPageRoutingModule } from './registro-plan-routing.module';

import { RegistroPlanPage } from './registro-plan.page';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroPlanPageRoutingModule,
    ComponentsModule,
    TranslateModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [RegistroPlanPage]
})
export class RegistroPlanPageModule {}
