import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilBankPageRoutingModule } from './perfil-bank-routing.module';

import { PerfilBankPage } from './perfil-bank.page';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilBankPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [PerfilBankPage]
})
export class PerfilBankPageModule {}
