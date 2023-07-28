import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CallRateImproverPage } from './call-rate-improver.page';

const routes: Routes = [
  {
    path: '',
    component: CallRateImproverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CallRateImproverPageRoutingModule {}
