import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WalletTarjetasPage } from './wallet-tarjetas.page';

const routes: Routes = [
  {
    path: '',
    component: WalletTarjetasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletTarjetasPageRoutingModule {}
