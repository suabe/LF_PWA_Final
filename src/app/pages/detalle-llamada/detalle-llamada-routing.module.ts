import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleLlamadaPage } from './detalle-llamada.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleLlamadaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleLlamadaPageRoutingModule {}
