import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilOptionsPageRoutingModule } from './perfil-options-routing.module';

import { PerfilOptionsPage } from './perfil-options.page';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilOptionsPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [PerfilOptionsPage]
})
export class PerfilOptionsPageModule {}
