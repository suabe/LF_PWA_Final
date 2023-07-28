import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilSuspendPageRoutingModule } from './perfil-suspend-routing.module';

import { PerfilSuspendPage } from './perfil-suspend.page';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { ArchwizardModule } from 'angular-archwizard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PerfilSuspendPageRoutingModule,
    ComponentsModule,
    TranslateModule,
    ArchwizardModule
  ],
  declarations: [PerfilSuspendPage]
})
export class PerfilSuspendPageModule {}
