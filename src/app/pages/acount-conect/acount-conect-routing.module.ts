import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcountConectPage } from './acount-conect.page';

const routes: Routes = [
  {
    path: '',
    component: AcountConectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcountConectPageRoutingModule {}
