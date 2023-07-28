import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilSuspendPage } from './perfil-suspend.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilSuspendPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilSuspendPageRoutingModule {}
