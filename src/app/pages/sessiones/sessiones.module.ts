import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SessionesPageRoutingModule } from './sessiones-routing.module';

import { SessionesPage } from './sessiones.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SessionesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SessionesPage]
})
export class SessionesPageModule {}
