import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CambiarTelPage } from './cambiar-tel.page';

const routes: Routes = [
  {
    path: '',
    component: CambiarTelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CambiarTelPageRoutingModule {}
