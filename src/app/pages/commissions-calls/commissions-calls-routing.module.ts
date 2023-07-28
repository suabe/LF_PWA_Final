import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommissionsCallsPage } from './commissions-calls.page';

const routes: Routes = [
  {
    path: '',
    component: CommissionsCallsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommissionsCallsPageRoutingModule {}
