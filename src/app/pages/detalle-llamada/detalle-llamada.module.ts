import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleLlamadaPageRoutingModule } from './detalle-llamada-routing.module';

import { DetalleLlamadaPage } from './detalle-llamada.page';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleLlamadaPageRoutingModule,
    ComponentsModule,
    TranslateModule,
    NgbModule
  ],
  declarations: [DetalleLlamadaPage]
})
export class DetalleLlamadaPageModule {}
