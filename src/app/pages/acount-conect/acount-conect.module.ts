import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcountConectPageRoutingModule } from './acount-conect-routing.module';

import { AcountConectPage } from './acount-conect.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AcountConectPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [AcountConectPage]
})
export class AcountConectPageModule {}
