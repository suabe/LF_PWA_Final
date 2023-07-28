import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CallDetailPage } from './call-detail.page';

const routes: Routes = [
  {
    path: '',
    component: CallDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CallDetailPageRoutingModule {}
