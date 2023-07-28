import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcountErrorPageRoutingModule } from './acount-error-routing.module';

import { AcountErrorPage } from './acount-error.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AcountErrorPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [AcountErrorPage]
})
export class AcountErrorPageModule {}
