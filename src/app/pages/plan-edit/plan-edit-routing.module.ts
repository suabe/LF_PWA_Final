import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanEditPage } from './plan-edit.page';

const routes: Routes = [
  {
    path: '',
    component: PlanEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanEditPageRoutingModule {}
