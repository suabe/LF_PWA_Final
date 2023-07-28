import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcountLinkPageRoutingModule } from './acount-link-routing.module';

import { AcountLinkPage } from './acount-link.page';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AcountLinkPageRoutingModule,
    ComponentsModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  declarations: [AcountLinkPage]
})
export class AcountLinkPageModule {}
