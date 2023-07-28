import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilPasswordPageRoutingModule } from './perfil-password-routing.module';

import { PerfilPasswordPage } from './perfil-password.page';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilPasswordPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [PerfilPasswordPage]
})
export class PerfilPasswordPageModule {}
