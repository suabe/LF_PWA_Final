import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioPageRoutingModule } from './inicio-routing.module';

import { InicioPage } from './inicio.page';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalificaLlamadaPage } from '../califica-llamada/califica-llamada.page';
import { CalificaLlamadaPageModule } from '../califica-llamada/califica-llamada.module';

@NgModule({
  entryComponents: [
    CalificaLlamadaPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioPageRoutingModule,
    ComponentsModule,
    TranslateModule,
    CalificaLlamadaPageModule,
    NgbModule
  ],
  declarations: [InicioPage]
})
export class InicioPageModule {}
