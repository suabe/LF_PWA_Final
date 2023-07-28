import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroImproverPageRoutingModule } from './registro-improver-routing.module';

import { RegistroImproverPage } from './registro-improver.page';
import { TranslateModule } from '@ngx-translate/core';
import { IonIntlTelInputModule } from 'ion-intl-tel-input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MomentTimezonePickerModule } from 'moment-timezone-picker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroImproverPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    IonIntlTelInputModule,
    NgbModule,
    MomentTimezonePickerModule
  ],
  declarations: [RegistroImproverPage]
})
export class RegistroImproverPageModule {}
