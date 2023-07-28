import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPlansPage } from './add-plans.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/add-plans/plan-103',
    pathMatch: 'full',
    
  },{
    path: '',
    component: AddPlansPage,
    children: [
      {
        path: 'plan-103',
        loadChildren: () => import('../add-plan103/add-plan103.module').then( m => m.AddPlan103PageModule)
      },
      {
        path: 'plan-plus',
        loadChildren: () => import('../add-planplus/add-planplus.module').then( m => m.AddPlanplusPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPlansPageRoutingModule {}
