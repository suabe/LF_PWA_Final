import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReferralDetailPage } from './referral-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ReferralDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReferralDetailPageRoutingModule {}
