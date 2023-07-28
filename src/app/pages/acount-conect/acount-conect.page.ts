import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { DataUsuarioService } from 'src/app/services/data-usuario.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acount-conect',
  templateUrl: './acount-conect.page.html',
  styleUrls: ['./acount-conect.page.scss'],
})
export class AcountConectPage implements OnInit {
  color = 'azul';
  generaLink = false;
  linkData
  acountData = false;
  loader
  constructor(
    public ngroute: Router,
    public _user: DataUsuarioService,
    public modalCtrl: ModalController,
    private http: HttpClient,
    public alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (this._user.dataUser.role === 'cliente') {
      this.color = 'naranja'
    }
  }

}
