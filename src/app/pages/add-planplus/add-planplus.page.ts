import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { DataUsuarioService } from 'src/app/services/data-usuario.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-add-planplus',
  templateUrl: './add-planplus.page.html',
  styleUrls: ['./add-planplus.page.scss'],
})
export class AddPlanplusPage implements OnInit {
  @ViewChild('addplan10Form') formElement;
  addplanForm = new FormGroup({
    language: new FormControl('', (Validators.required)),
    schedule: new FormControl('',(Validators.required)),
    idref: new FormControl('')
  });
  planes
  languages
  filtrados
  selc_es = false;
  selc_en = false;
  selc_fr = false;
  selc_cn = false;
  constructor( 
    private alertCtrl: AlertController,
    private _user: DataUsuarioService,
    private afStore: AngularFirestore,
    private _toast: ToastService,
    private loading: LoadingController,
    private router: Router
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
          actions.disable();

          // Enable or disable the button when it is checked or unchecked
          this.addplanForm.valueChanges.subscribe(valor => {
            console.log('es valido',this.addplanForm.valid);
                        
            if (this.addplanForm.valid) {
              actions.enable();
            } else {
              actions.disable();
            }
          })
        }, onClick: () => {
          if (!this.addplanForm.valid) {
            document.querySelector('#payPalMsg').classList.remove('hidden')
          }
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

  ionViewWillEnter() {
    this.getPlans()
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
      idioma: this.addplanForm.get('language').value,
      schedule: this.addplanForm.get('schedule').value,
      idref: this.addplanForm.get('idref').value
    }
    await this.afStore.collection('plans').doc(data.subscriptionID).set(plans).then( data => {
      this._toast.showToast('¡Se ha agregado un nuevo plan!', 5000);
      this.router.navigate(['plans'])
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

  getPlans() {
    try {
      this.afStore.collection('plans', ref => ref.where('uid', '==', this._user.userID ).where('activa','==',true)).snapshotChanges()
      .subscribe( data => {
        this.planes = data.map( result => {
          return result.payload.doc.data()
        })
        this.planes.forEach(plan => {
          if (plan.idioma == 'es') {
            this.selc_es = true;
          }
          if (plan.idioma == 'en') {
            this.selc_en = true;
          }
          if (plan.idioma == 'fr') {
            this.selc_fr = true;
          }
          if (plan.idioma == 'cn') {
            this.selc_cn = true
          }
            
          //this.addPlans.get('planes.'+plan.idioma+'.ln').disable()
          //this.filtrados =this.languages.filter( lang => lang.ln != plan.idioma )
          //console.log(this.filtrados);
          
        });
        console.log('planes', this.planes);
        
      } )      
    } catch (error) {
      console.log('erro');
      
    }
  }

}
