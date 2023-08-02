import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WalletService } from '../../services/wallet.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataUsuarioService } from '../../services/data-usuario.service';
import { AgregaTarjetaPage } from '../agrega-tarjeta/agrega-tarjeta.page';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-agrega-plan-modal',
  templateUrl: './agrega-plan-modal.page.html',
  styleUrls: ['./agrega-plan-modal.page.scss'],
})
export class AgregaPlanModalPage implements OnInit {
  wallet
  precio
  loader
  @Input() plan;
  contratarForm = new FormGroup({
    idioma: new FormControl('', [Validators.required]),
    horario: new FormControl('',Validators.required),
    horario2: new FormControl('',Validators.required),
    tarjeta: new FormControl('',Validators.required)
  })
  
  constructor(
    public modalCtrl: ModalController,
    public afStore: AngularFirestore,
    public _user: DataUsuarioService,
    public http: HttpClient,
    public _toast: ToastService,
    public loading: LoadingController
  ) { }

  ngOnInit() {
    this.getWallet()
    if (this.plan == 1) {
      this.precio = 'price_1IiLcPFjLGC5FmHqDAZZskyw'
    } if (this.plan == 2) {
      this.precio = 'price_1IiLr3FjLGC5FmHq8Z2z8pnq'
    }
  }

  ionViewWillEnter() {    
    
  }

  async contratar() {
    this.loader = await this.loading.create({
      message: 'Procesando...',
      mode: 'ios',
      spinner: 'bubbles'
    })
    this.loader.present()
    this.http.post('https://us-central1-pwa-lf.cloudfunctions.net/crearPlan', {
      customer: this.contratarForm.get('tarjeta').value,
      priceId: this.precio
    }).subscribe( async (data: any) => {
      if (data.id) {
        let plan = {
          plan: data.id,
          activa: true,
          price: this.precio,
          enllamada: false,
          creada: data.created,
          uid: this._user.userID,
          status: data.status,
          start_date: data.start_date,
          customer: data.customer,
          idioma: this.contratarForm.get('idioma').value,
          start: this.contratarForm.get('horario').value,
          end: this.contratarForm.get('horario2').value
        }
        await this.afStore.collection('plans').doc(data.id).set(plan).then( data => {
          this.loader.dismiss();
          this.modalCtrl.dismiss();
          this._toast.showToast('¡Se ha agregado un nuevo plan!', 5000)
        })
      } else {
        this.loader.dismiss();
        this.modalCtrl.dismiss();
        this._toast.showToast('¡Error al crear plan!', 5000)
      }
      
    } )
    //this.modalCtrl.dismiss();
  }

  cancelar() {
    this.modalCtrl.dismiss();
  }

  async getWallet() {
    await this.afStore.collection('wallet', ref => ref.where('uid', '==', this._user.userID )).snapshotChanges()
    .subscribe( data => {
      this.wallet = data.map( result => {
        return result.payload.doc.data()
      })
    } )
  }

  async addCard() {
    const modal = await this.modalCtrl.create({
      component: AgregaTarjetaPage,
      componentProps: {
        item: 'item'
      }
    });

    await modal.present();

    const {data} = await modal.onDidDismiss();
  }

}
