import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AyudaFacturaPage } from './ayuda-factura.page';

const routes: Routes = [
  {
    path: '',
    component: AyudaFacturaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AyudaFacturaPageRoutingModule {}
