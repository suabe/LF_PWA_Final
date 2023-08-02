import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { ToastService } from '../../services/toast.service';
import { HttpClient} from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataUsuarioService } from '../../services/data-usuario.service';
import { TranslateService } from '@ngx-translate/core';

declare var Stripe;

@Component({
  selector: 'app-agrega-tarjeta',
  templateUrl: './agrega-tarjeta.page.html',
  styleUrls: ['./agrega-tarjeta.page.scss'],
})
export class AgregaTarjetaPage implements OnInit {
  stripe: any;
  host: any;
  disabled: boolean = true;
  loader: any;
  card: any;
  name: string = "";
  email: string = "";
  priceID: string ="";
  constructor(
    private modalCtrl: ModalController,
    private loading: LoadingController,
    private alertc: AlertController,
    private toastService: ToastService,
    private http: HttpClient,
    private fbstore: AngularFirestore,
    public _user: DataUsuarioService,
    private translate: TranslateService
  ) {
    // this.stripe = new Stripe('pk_test_51IdzQvFjLGC5FmHqNEcCIDKir8SZhCPCKJe6Z9M07rfukQtstQfzllgTJktH7IkVHy0c8PTSIIPHEGDbO319mfOZ00DL0fDLYQ')
    //this.host = 'http://localhost:5001/pwa-lf/us-central1/';
    this.stripe = new Stripe('pk_live_51LVhdSEeGmiJ1g9DjMLCdYMefys2NdlW8T9WnaWB4Eut8SpTGeDCEFbKsl2yRUC27wSJ5XsAwY0NbNcp2IoSKT7O002TgmQ2t4')
    this.host = 'https://us-central1-pwa-lf.cloudfunctions.net/';
   }

  ngOnInit() {
    this.setupStripe();
    this.name = this._user.dataUser.name+' '+this._user.dataUser.lastName
    this.email = this._user.dataUser.email
  }

  setupStripe() {
    let elements = this.stripe.elements();
    var style = {
      base: {
        color: '#000',
        lineHeight: '24px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };
    this.card = elements.create('card', { style: style, hidePostalCode: true });

    this.card.mount('#card-element');

    this.card.addEventListener('change', event => {
      var displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
        this.disabled = true;
      } else {
        displayError.textContent = '';
        this.disabled = false;
      }

    });
    var form = document.getElementById('payment-form');

    form.addEventListener('submit', async event => {
      event.preventDefault();
      
      this.loader = await this.loading.create({
        message: this.translate.instant('ADDCARD.LOADING'),
        mode: 'ios'
      });
      this.loader.present();
      await this.stripe.createSource(this.card).then(async result => {
        if (result.error) {
          var errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
          this.loading.dismiss();
        } else {
          console.log('source =>',result);
          await this.attachSourceNewCustomer(result);
          
        }
      })
    });
  }

  attachSourceNewCustomer(result) {
    this.http.post(this.host+'attachSourceNewCustomer',{
      name: this.name,
      email: this.email,
      token: result.source.id
    }).subscribe(async (data: any) => {
      console.log('costumer =>',data);
      // this.loading.dismiss();
      if (data.type == 'StripeCardError') {
        this.loading.dismiss();
          this.toastService.showToast(data.raw.message,3000)
      } else {
        if (data.id != '') {
         await this.saveWallet(result, data)
  
        } else {
          
          this.loading.dismiss();
          this.toastService.showToast('¡Error al guardar!',2000)
        }
        
      }
    });
  }

  async saveWallet(result, customer) {
    
    let payMethod = {
      uid: this._user.userID,
      token: result.source.id,
      card: result.source.card,
      customer: customer.id,
      activa: true,
      creada: new Date().getTime()
    }

    await this.fbstore.collection('wallet').doc(result.source.id).set(payMethod).then(data => {
      this.loading.dismiss();
      this.toastService.showToast('Se agrego Tarjeta', 2000);
      this.modalCtrl.dismiss(payMethod);
    })
  }

  savePaymentMethod(result, customer) {
    //console.log('Price ID', this.priceID[0]);
    
    this.http.post(this.host+'crearPlan', {
      customer: customer.id,
      priceId: this.priceID
    }).subscribe(  async (data: any) => {
      if (data.id) {
        let payMethod = {
          token: result.source.id,
          card: result.source.card,
          customer: customer.id,
          plan: data.id,
          activa: true,
          creada: data.created
        }
        console.log('Stripe ->', data);
        await this.fbstore.collection('plans').doc(this._user.userID).set(data)
        await this.fbstore.collection('wallet').doc(this._user.userID).set(payMethod).then(data => {
          console.log('Se agrego Plan');
          this.alertc.dismiss()
          this.modalCtrl.dismiss({plan: data});
          this.loading.dismiss();
        })
        
      } else {
        this.alertc.dismiss()
        this.loading.dismiss();
        this.toastService.showToast('Error al crear Plan',3000)
      }
    });
    
  }

  async showLoadin(msg) {

  }

  guardar() {
    this.modalCtrl.dismiss({
      tarjeta: '4242'
    });
  }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }


}
