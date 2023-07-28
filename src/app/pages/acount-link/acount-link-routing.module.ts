import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcountLinkPage } from './acount-link.page';

const routes: Routes = [
  {
    path: '',
    component: AcountLinkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcountLinkPageRoutingModule {}
