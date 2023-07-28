import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPlanplusPage } from './add-planplus.page';

const routes: Routes = [
  {
    path: '',
    component: AddPlanplusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPlanplusPageRoutingModule {}
