import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroSpeakerPageRoutingModule } from './registro-speaker-routing.module';

import { RegistroSpeakerPage } from './registro-speaker.page';
import { TranslateModule } from '@ngx-translate/core';
import { IonIntlTelInputModule } from 'ion-intl-tel-input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ArchwizardModule } from 'angular-archwizard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroSpeakerPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    IonIntlTelInputModule,
    NgbModule,
    ArchwizardModule
  ],
  declarations: [RegistroSpeakerPage]
})
export class RegistroSpeakerPageModule {}
