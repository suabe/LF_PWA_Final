import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BankEditPageRoutingModule } from './bank-edit-routing.module';

import { BankEditPage } from './bank-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BankEditPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [BankEditPage]
})
export class BankEditPageModule {}
