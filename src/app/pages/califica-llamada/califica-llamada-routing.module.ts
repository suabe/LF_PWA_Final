import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalificaLlamadaPage } from './califica-llamada.page';

const routes: Routes = [
  {
    path: '',
    component: CalificaLlamadaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalificaLlamadaPageRoutingModule {}
