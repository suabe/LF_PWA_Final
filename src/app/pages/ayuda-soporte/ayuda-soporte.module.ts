import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AyudaSoportePageRoutingModule } from './ayuda-soporte-routing.module';

import { AyudaSoportePage } from './ayuda-soporte.page';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AyudaSoportePageRoutingModule,
    ComponentsModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  declarations: [AyudaSoportePage]
})
export class AyudaSoportePageModule {}
