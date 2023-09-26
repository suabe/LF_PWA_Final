import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataUsuarioService } from 'src/app/services/data-usuario.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-plan103',
  templateUrl: './add-plan103.page.html',
  styleUrls: ['./add-plan103.page.scss'],
})
export class AddPlan103Page implements OnInit {
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
    private router: Router,
    private trasnslate: TranslateService
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
            plan_id: 'P-3J268263FT404650SMOCRMSY'
          });
        },
        onApprove: (data, actions) => {
          //alert(data.subscriptionID); // You can add optional success message for the subscriber here
          this.addplan(data)
        }, onError: (err) => {
          // For example, redirect to a specific error page

          
        }, onCancel: (data) => {
          // Show a cancel page, or return to cart
          
          this.cancelado()
        }
      }).render('#paypal-button-container-P-3J268263FT404650SMOCRMSY'); // Renders the PayPal button
    }, 700);
  }

  ionViewWillEnter() {
    this.getPlans()
  }

  ngOnInit() {
    
  }

  async addplan(data) {
    
    let plans = {
      plan: data.subscriptionID,
      activa: true,
      price: 'Fluency 10/3',
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
          
          
        });
        
        
      } )      
    } catch (error) {
      
      
    }
  }

}
