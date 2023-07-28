import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { AgregaTarjetaPage } from '../agrega-tarjeta/agrega-tarjeta.page';
import { Plugins } from '@capacitor/core'
import '@capacitor-community/stripe';
import { StripePlugin } from '@capacitor-community/stripe';
import { WalletService } from '../../services/wallet.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataUsuarioService } from '../../services/data-usuario.service';

const Stripe  = Plugins.Stripe as StripePlugin;


@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {

  wallet:any = ''
  pagos = []
  constructor(
    private modalCtrl: ModalController,
    private loading: LoadingController,
    private afStore: AngularFirestore,
    private _user: DataUsuarioService
  ) {
    
   }

  ngOnInit() {

  }

  ionViewWillEnter() {    
    
  }

 

  
  

  

}
