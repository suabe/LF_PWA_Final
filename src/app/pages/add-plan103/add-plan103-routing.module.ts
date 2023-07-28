import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPlan103Page } from './add-plan103.page';

const routes: Routes = [
  {
    path: '',
    component: AddPlan103Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPlan103PageRoutingModule {}
