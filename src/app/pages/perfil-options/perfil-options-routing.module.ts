import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilOptionsPage } from './perfil-options.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilOptionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilOptionsPageRoutingModule {}
