import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AyudaPageRoutingModule } from './ayuda-routing.module';

import { AyudaPage } from './ayuda.page';
import { ComponentsModule } from '../../components/components.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { AyudaFacturaPage } from '../ayuda-factura/ayuda-factura.page';
import { AyudaSoportePage } from '../ayuda-soporte/ayuda-soporte.page';
import { AyudaSoportePageModule } from '../ayuda-soporte/ayuda-soporte.module';
import { AyudaFacturaPageModule } from '../ayuda-factura/ayuda-factura.module';

@NgModule({
  entryComponents: [
    AyudaFacturaPage,
    AyudaSoportePage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AyudaPageRoutingModule,
    ComponentsModule,
    NgbModule,
    TranslateModule,
    AyudaSoportePageModule,
    AyudaFacturaPageModule
  ],
  declarations: [AyudaPage]
})
export class AyudaPageModule {}
