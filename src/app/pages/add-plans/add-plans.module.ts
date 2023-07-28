import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPlansPageRoutingModule } from './add-plans-routing.module';

import { AddPlansPage } from './add-plans.page';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPlansPageRoutingModule,
    ComponentsModule,
    TranslateModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [AddPlansPage]
})
export class AddPlansPageModule {}
