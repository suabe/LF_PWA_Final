import { Component, OnInit } from '@angular/core';
import { DataUsuarioService } from '../../services/data-usuario.service';
import { ModalController } from '@ionic/angular';
import { BankEditPage } from '../bank-edit/bank-edit.page';

@Component({
  selector: 'app-perfil-bank',
  templateUrl: './perfil-bank.page.html',
  styleUrls: ['./perfil-bank.page.scss'],
})
export class PerfilBankPage implements OnInit {
  userPerfil
  color = 'azul';
  constructor(
    private _user: DataUsuarioService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (this._user.dataUser.role === 'cliente') {
      this.color = 'naranja'
    }
    this.userPerfil = this._user.dataUser 
  }

  async modificaSpei() {
    const modal = await this.modalCtrl.create({
      component: BankEditPage,
      animated: true,
      backdropDismiss: false,
      mode: 'ios'
    })

    await modal.present();
  }

}
