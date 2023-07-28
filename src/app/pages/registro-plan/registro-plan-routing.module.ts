import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroPlanPage } from './registro-plan.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroPlanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroPlanPageRoutingModule {}
