import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroSpeakerPage } from './registro-speaker.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroSpeakerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroSpeakerPageRoutingModule {}
