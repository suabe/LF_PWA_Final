import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CallsPageRoutingModule } from './calls-routing.module';

import { CallsPage } from './calls.page';
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
    CallsPageRoutingModule,
    CalificaLlamadaPageModule,
    ComponentsModule,
    TranslateModule,
    NgbModule
  ],
  declarations: [CallsPage]
})
export class CallsPageModule {}
