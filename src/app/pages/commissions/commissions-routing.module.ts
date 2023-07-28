import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommissionsPage } from './commissions.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/commissions/calls',
    pathMatch: 'full'
  },
  {
    path: '',
    component: CommissionsPage,
    children: [
      {
        path: 'calls',
        loadChildren: () => import('../commissions-calls/commissions-calls.module').then( m => m.CommissionsCallsPageModule)
      },
      {
        path: 'referrals',
        loadChildren: () => import('../commissions-referrals/commissions-referrals.module').then(m => m.CommissionsReferralsPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommissionsPageRoutingModule {}
