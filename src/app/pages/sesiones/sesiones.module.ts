import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SesionesPageRoutingModule } from './sesiones-routing.module';

import { SesionesPage } from './sesiones.page';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SesionesPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [SesionesPage]
})
export class SesionesPageModule {}
