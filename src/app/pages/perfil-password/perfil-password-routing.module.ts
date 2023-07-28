import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilPasswordPage } from './perfil-password.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilPasswordPageRoutingModule {}
