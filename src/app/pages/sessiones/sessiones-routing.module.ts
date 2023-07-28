import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SessionesPage } from './sessiones.page';

const routes: Routes = [
  {
    path: '',
    component: SessionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SessionesPageRoutingModule {}
