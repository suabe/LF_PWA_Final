import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilBankPage } from './perfil-bank.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilBankPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilBankPageRoutingModule {}
