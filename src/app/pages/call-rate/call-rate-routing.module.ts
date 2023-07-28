import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CallRatePage } from './call-rate.page';

const routes: Routes = [
  {
    path: '',
    component: CallRatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CallRatePageRoutingModule {}
