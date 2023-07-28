import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WalletPage } from './wallet.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/wallet/pagos',
    pathMatch: 'full'
  },
  {
    path: '',
    component: WalletPage,
    children: [
      {
        path: 'pagos',
        loadChildren: () => import('../wallet-pagos/wallet-pagos.module').then( m => m.WalletPagosPageModule)
      },
      {
        path: 'tarjetas',
        loadChildren: () => import('../wallet-tarjetas/wallet-tarjetas.module').then( m => m.WalletTarjetasPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletPageRoutingModule {}
