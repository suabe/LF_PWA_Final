import { Component, OnInit } from '@angular/core';
import { DataUsuarioService } from '../../services/data-usuario.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { AgregaTarjetaPage } from '../agrega-tarjeta/agrega-tarjeta.page';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-wallet-tarjetas',
  templateUrl: './wallet-tarjetas.page.html',
  styleUrls: ['./wallet-tarjetas.page.scss'],
})
export class WalletTarjetasPage implements OnInit {
  wallet:any = ''
  loading: any;
  constructor(  
    private afStore: AngularFirestore,
    public _user: DataUsuarioService,
    public modalCtrl: ModalController,
    private alert: AlertController,
    private loadingCtrl: LoadingController,
    private http: HttpClient,
    private toast: ToastService
  ) { }
  
  ionViewWillEnter() {
    this.getWallet()    
  }
  ngOnInit() {
  }

  async getWallet() {
    await this.afStore.collection('wallet', ref => ref.where('uid', '==', this._user.userID ).where('activa','==',true)).snapshotChanges()
    .subscribe( data => {
      this.wallet = data.map( result => {
        return result.payload.doc.data()
      })
      // console.log(this.wallet);
      
    } )
  }

  async agregaTarjeta() {
    const modal = await this.modalCtrl.create({
      component: AgregaTarjetaPage,
      componentProps: {
        item: 'item'
      }
    });

    await modal.present();

    const {data} = await modal.onDidDismiss();
    // console.log('Datos a guardar', data);
    // window.location.reload();
  }

  async borraTarjeta(card) {
    
    const alert = await this.alert.create({
      header: 'Eliminar tarjeta',
      subHeader: '¿Deseas eliminar la tarjeta?',
      message: 'Esta accion cancelara todos los planes activos asociados a esta tarjeta',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (cancel) => {
            console.log('Cancelado');
            
          }
        },{
          text: 'Aceptar',
          handler: async (data) => {
            this.presentLoading('Espere...')
            let planes
            await this.afStore.collection('plans', ref => ref.where('customer','==',card.customer).where('status','==','active')).get().subscribe(async plans => {
              if (!plans.empty) {
                plans.forEach(doc => {
                  console.log(doc.id, '=>', doc.data());
                  this.http.post('https://us-central1-pwa-lf.cloudfunctions.net/deletePlan',{
                    plan: doc.data()['plan']
                  }).subscribe( async (data:any) => {
                    if (data.id) {
                      let update = {
                        activa: false,
                        status: data.status,
                        canceled_at: data.canceled_at,
                        motivo: 'Se elimino tarjeta'
                      }
  
                      await this.afStore.collection('plans').doc(doc.data()['plan']).update(update).then( data => {
                        this.loading.dismiss();              
                        this.toast.showToast('Plan elimidano', 3500);
                      })
  
                    } else {
                      this.loading.dismiss();
                      this.toast.showToast('Error al eliminar', 3500);
                    }
                  } )
                })
              }
              await this.afStore.collection('wallet').doc(card.token).update({'activa': false, 'canceled_at': new Date().toLocaleString()}).then(() => {
                this.loading.dismiss();
                this.toast.showToast('Tarjeta eliminada', 3500);
              })
            })
            console.log(card);
          }
        }
      ]
    })
    await alert.present();
  }

  async presentLoading( message: string ) {
    this.loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      mode: 'ios',
      message
    });
    this.loading.present();
  }


}
