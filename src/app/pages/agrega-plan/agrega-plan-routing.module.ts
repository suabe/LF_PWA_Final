import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregaPlanPage } from './agrega-plan.page';

const routes: Routes = [
  {
    path: '',
    component: AgregaPlanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregaPlanPageRoutingModule {}
