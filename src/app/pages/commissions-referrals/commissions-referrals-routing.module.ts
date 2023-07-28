import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommissionsReferralsPage } from './commissions-referrals.page';

const routes: Routes = [
  {
    path: '',
    component: CommissionsReferralsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommissionsReferralsPageRoutingModule {}
