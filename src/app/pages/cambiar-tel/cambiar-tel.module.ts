import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambiarTelPageRoutingModule } from './cambiar-tel-routing.module';

import { CambiarTelPage } from './cambiar-tel.page';
import { IonIntlTelInputModule } from 'ion-intl-tel-input';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambiarTelPageRoutingModule,
    ReactiveFormsModule,
    IonIntlTelInputModule,
    TranslateModule
  ],
  declarations: [CambiarTelPage]
})
export class CambiarTelPageModule {}
