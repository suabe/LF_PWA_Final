import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WalletPagosPage } from './wallet-pagos.page';

const routes: Routes = [
  {
    path: '',
    component: WalletPagosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletPagosPageRoutingModule {}
