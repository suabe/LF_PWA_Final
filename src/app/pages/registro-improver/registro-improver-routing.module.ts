import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroImproverPage } from './registro-improver.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroImproverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroImproverPageRoutingModule {}
