import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, ModalController, AlertController } from '@ionic/angular';
import { DataUsuarioService } from 'src/app/services/data-usuario.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-upgrade-plan',
  templateUrl: './upgrade-plan.page.html',
  styleUrls: ['./upgrade-plan.page.scss'],
})
export class UpgradePlanPage implements OnInit {
  @Input() idioma;
  @Input() schedule;
  @Input() idref;

  constructor( 
    private _user: DataUsuarioService,
    private afStore: AngularFirestore,
    private _toast: ToastService,
    private loading: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) { 
    setTimeout(() => {
      <any>window['paypal'].Buttons({
        style: {
          shape: 'pill',
          color: 'black',
          layout: 'horizontal',
          label: 'subscribe'
        }, onInit: (data, actions) => { 
          // Disable the buttons
          //actions.disable();

        
        }, onClick: () => {
          
        }, createSubscription: (data, actions) => {
          return actions.subscription.create({
            /* Creates the subscription */
            plan_id: 'P-8LD78680P96382408MOCRTYY'
          });
        },
        onApprove: (data, actions) => {
          //alert(data.subscriptionID); // You can add optional success message for the subscriber here
          this.addplan(data)
        }, onError: (err) => {
          // For example, redirect to a specific error page
          console.log('errorPayPal =>', err);
          
        }, onCancel: (data) => {
          // Show a cancel page, or return to cart
          console.log('cancelo');
          this.cancelado()
        }
      }).render('#paypal-button-container-P-8LD78680P96382408MOCRTYY'); // Renders the PayPal button
    }, 700);
  }

  ngOnInit() {
  }

  async addplan(data) {
    console.log('aqui =>', data);
    let plans = {
      plan: data.subscriptionID,
      activa: true,
      price: '+Fluency',
      enllamada: false,
      creadaDate: new Date(),
      uid: this._user.userID,
      status: 'active',            
      idioma: this.idioma,
      schedule: this.schedule,
      idref: this.idref
    }
    await this.afStore.collection('plans').doc(data.subscriptionID).set(plans).then( data => {
      this._toast.showToast('¡Se ha agregado un nuevo plan!', 5000);
      this.modalCtrl.dismiss()
    })
  }

  async cancelado() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Cancelado',
      subHeader: 'PayPal',
      message: 'Se ha cancelado el proceso de PayPal.',
      mode: 'ios',
      buttons: ['OK'],
    });

    await alert.present();
    
  }

  

}
