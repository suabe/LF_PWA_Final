import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WalletTarjetasPageRoutingModule } from './wallet-tarjetas-routing.module';

import { WalletTarjetasPage } from './wallet-tarjetas.page';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WalletTarjetasPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [WalletTarjetasPage]
})
export class WalletTarjetasPageModule {}
