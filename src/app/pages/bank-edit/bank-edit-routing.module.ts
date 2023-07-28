import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BankEditPage } from './bank-edit.page';

const routes: Routes = [
  {
    path: '',
    component: BankEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BankEditPageRoutingModule {}
