import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WalletPagosPageRoutingModule } from './wallet-pagos-routing.module';

import { WalletPagosPage } from './wallet-pagos.page';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WalletPagosPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [WalletPagosPage]
})
export class WalletPagosPageModule {}
