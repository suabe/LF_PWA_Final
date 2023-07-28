import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WalletPageRoutingModule } from './wallet-routing.module';

import { WalletPage } from './wallet.page';
import { ComponentsModule } from '../../components/components.module';
import { AgregaTarjetaPageModule } from '../agrega-tarjeta/agrega-tarjeta.module';
import { AgregaTarjetaPage } from '../agrega-tarjeta/agrega-tarjeta.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  entryComponents: [
    AgregaTarjetaPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WalletPageRoutingModule,
    ComponentsModule,
    AgregaTarjetaPageModule,
    TranslateModule
  ],
  declarations: [WalletPage]
})
export class WalletPageModule {}
