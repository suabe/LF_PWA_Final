import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilDeletePageRoutingModule } from './perfil-delete-routing.module';

import { PerfilDeletePage } from './perfil-delete.page';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { ArchwizardModule } from 'angular-archwizard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PerfilDeletePageRoutingModule,
    ComponentsModule,
    TranslateModule,
    ArchwizardModule
  ],
  declarations: [PerfilDeletePage]
})
export class PerfilDeletePageModule {}
