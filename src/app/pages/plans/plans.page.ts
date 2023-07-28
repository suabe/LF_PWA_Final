import { Component, OnInit } from '@angular/core';
import { DataUsuarioService } from '../../services/data-usuario.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { AgregaPlanPage } from '../agrega-plan/agrega-plan.page';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../../services/toast.service';
import { PlanEditPage } from '../plan-edit/plan-edit.page';
import { TranslateService } from '@ngx-translate/core';
import { UpgradePlanPage } from '../upgrade-plan/upgrade-plan.page';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.page.html',
  styleUrls: ['./plans.page.scss'],
})
export class PlansPage implements OnInit {
  planes: any; 
  hayPlanes:boolean = false
  loading: any;
  host: any;
  constructor(
    public _user: DataUsuarioService,
    public fbstore: AngularFirestore,
    public modalCtrl: ModalController,
    private alert: AlertController,
    private loadingCtrl: LoadingController,
    private http: HttpClient,
    private toast: ToastService,
    private translate: TranslateService
  ) { 
    //this.host = 'http://localhost:5001/ejemplocrud-e7eb1/us-central1/';
    this.host = 'https://us-central1-ejemplocrud-e7eb1.cloudfunctions.net/';
   }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getPlans()
  }

  getPlans() {
    try {
      this.fbstore.collection('plans', ref => ref.where('uid', '==', this._user.userID ).where('activa','==',true)).snapshotChanges()
      .subscribe( data => {
        this.planes = data.map( result => {
          return result.payload.doc.data()
        })
        this.planes.forEach((plan) => {
          plan.inicio = parseInt(plan.schedule),
          plan.fin = parseInt(plan.schedule)+3
          // this.fbstore.collection('wallet', ref => ref.where('customer','==',plan.customer)).snapshotChanges().subscribe(cus => {
          //   cus.map( result => {
          //     plan.card = result.payload.doc.data()['card'],
          //     plan.inicio = parseInt(plan.schedule),
          //     plan.fin = parseInt(plan.schedule)+3
          //   })
          // })
          // this.fbstore.collection('prices', ref => ref.where('price','==',plan.price)).snapshotChanges().subscribe(pri => {
          //   pri.map( result => {
          //     plan.type = result.payload.doc.data()['type']
          //   })
          // })
        });
        if (this.planes.length > 0) {
          this.hayPlanes = true
        }
        console.log(this.planes);
        
      } )
    } catch (error) {
      console.log('erro');
      
    }
  }

  agregar() {
    
  }

  async upgradePlan(dataPlan) {
    const alert = await this.alert.create({
      header: this.translate.instant('PLANS.UPGRADETITLE'),
      subHeader:  this.translate.instant('PLANS.UPGRADESUBTITLE'),
      message: this.translate.instant('PLANS.UPGRADEMESSAGE'),
      mode: 'ios',
      buttons: [
        {
          text: this.translate.instant('PLANS.UPGRADEBTNCANCEL'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: (cancel) => {
            console.log('Cancelado');
            
          }
        },{
          text: this.translate.instant('PLANS.UPGRADEBTNACEPT'),
          handler: async (data) => {
            const modalUpgrade = await this.modalCtrl.create({
              component: UpgradePlanPage,
              componentProps: {
                idioma: dataPlan.idioma,
                schedule: dataPlan.schedule,
                idref: dataPlan.idref
              },
              backdropDismiss: false,
              keyboardClose: false
            })
            this.presentLoading('...Espere');
            this.http.post(this.host+'deletePlan',{
              plan: dataPlan.plan,
              motivo: 'Upgrade de plan'
            }).subscribe( async (data:any) => {

              this.toast.showToast('¡Eliminando plan anterior', 3000);
              let update = {
                activa: false,
                status: 'canceled',
                canceled_at: new Date(),
                motivo: 'Upgrade de plan'
              }
              
              await this.fbstore.collection('plans').doc(dataPlan.plan).update(update).then(async planUpdate => {
                this.loading.dismiss();
                await modalUpgrade.present();
              })
              
            }, async error => {
              this.loading.dismiss();
              this.toast.showToast('Error al eliminar', 3500);
              //await modalUpgrade.present();
            } )
          }
        }
      ]
    })
    await alert.present();
  }

  async eliminar(susc) {
    console.log(susc);
    
    const alert = await this.alert.create({
      header: 'Eliminar Plan',
      message: '¿Deseas eliminar este plan?',
      mode: 'ios',
      inputs: [
        {
          name: 'motivo',
          type: 'text',
          label: '¿Por qué cancelas?',
          placeholder: '¿Por qué cancelas?'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (cancel) => {
            console.log('Cancelado');
            
          }
        },
        {
          text: 'Aceptar',
          handler: (eliminar) => {
            if (eliminar.motivo) {
              this.presentLoading('...Espere');
              this.http.post(this.host+'deletePlan',{
                plan: susc.plan,
                motivo: eliminar.motivo
              }).subscribe( async (data:any) => {
                let update = {
                  activa: false,
                  status: 'canceled',
                  canceled_at: new Date(),
                  motivo: eliminar.motivo
                }

                await this.fbstore.collection('plans').doc(susc.plan).update(update).then( data => {
                  this.loading.dismiss();              
                  this.toast.showToast('Plan elimidano', 3500);
                })                
              }, error => {
                this.loading.dismiss();
                console.log(error);                
                this.toast.showToast('Error al eliminar', 3500);
              } )
              
            } else {
              if (!alert.getElementsByClassName("validation-errors").length) {
                const input = alert.getElementsByTagName("input")[0];
  
                const validationErrors = document.createElement("div");
                validationErrors.className = "validation-errors";
  
                const errorMessage = document.createElement("small");
                errorMessage.classList.add("error-message");
                errorMessage.textContent = "Ingrese el motivo";
  
                validationErrors.appendChild(errorMessage);
  
                input.insertAdjacentElement("afterend", validationErrors);
              }
              return false
            }
            
          }
        }
      ]
    })

    await alert.present();
  }

  async editar(plan) {
    console.log(plan);
    
    const modal = await this.modalCtrl.create({
      component: PlanEditPage,
      componentProps: plan
    })
    await modal.present();
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
