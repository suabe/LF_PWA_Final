import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AyudaFacturaPageRoutingModule } from './ayuda-factura-routing.module';

import { AyudaFacturaPage } from './ayuda-factura.page';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AyudaFacturaPageRoutingModule,
    ComponentsModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  declarations: [AyudaFacturaPage]
})
export class AyudaFacturaPageModule {}
