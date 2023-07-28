import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarPerfilPageRoutingModule } from './editar-perfil-routing.module';

import { EditarPerfilPage } from './editar-perfil.page';
import { IonIntlTelInputModule } from 'ion-intl-tel-input';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MomentTimezonePickerModule } from 'moment-timezone-picker';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditarPerfilPageRoutingModule,
    IonIntlTelInputModule,
    TranslateModule,
    NgbModule,
    MomentTimezonePickerModule
  ],
  declarations: [EditarPerfilPage]
})
export class EditarPerfilPageModule {}
