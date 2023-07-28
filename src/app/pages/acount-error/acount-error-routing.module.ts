import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcountErrorPage } from './acount-error.page';

const routes: Routes = [
  {
    path: '',
    component: AcountErrorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcountErrorPageRoutingModule {}
