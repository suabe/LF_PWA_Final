import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilDeletePage } from './perfil-delete.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilDeletePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilDeletePageRoutingModule {}
