import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregaTarjetaPage } from './agrega-tarjeta.page';

const routes: Routes = [
  {
    path: '',
    component: AgregaTarjetaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregaTarjetaPageRoutingModule {}
