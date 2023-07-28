import { Component, OnInit } from '@angular/core';
import { DataUsuarioService } from '../../services/data-usuario.service';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-ayuda-factura',
  templateUrl: './ayuda-factura.page.html',
  styleUrls: ['./ayuda-factura.page.scss'],
})
export class AyudaFacturaPage implements OnInit {
  color = 'azul'
  loader: any;
  pagos
  facturaForm = new FormGroup({
    pago: new FormControl('',[Validators.required]),
    name: new FormControl('',[Validators.required]),
    rfc: new FormControl('',[Validators.required]),
    address: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required, Validators.email]),
    message: new FormControl('',[Validators.required])
  })
  constructor(
    public _user: DataUsuarioService,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    private fbstore: AngularFirestore,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.getPagos()
  }

  ionViewWillEnter() {
    if (this._user.dataUser.role === 'cliente') {
      this.color = 'naranja'
    }
  }

  async getPagos() {
    await  this.fbstore.collection('pagos', ref => ref.where('uid','==',this._user.userID)).snapshotChanges()
    .subscribe( data => {
      this.pagos = data.map( result => {
        // console.log('Pagos=>',result);
        return {
          id: result.payload.doc.id,
          invoice: result.payload.doc.data()['invoice'],
          pagado: result.payload.doc.data()['amount_paid'],
          created: result.payload.doc.data()['created'],
          subscription: result.payload.doc.data()['subscription'],
          plan: '',
          lang: '',
          planStatus: '',
          planDate: '',
          type: ''
        }
      })
      this.pagos.forEach((pago) => {
        this.fbstore.collection('plans').doc(pago.subscription).get().subscribe(plan => {
          pago.plan = plan.data()['price'],
          pago.lang = plan.data()['idioma'],
          pago.planStatus = plan.data()['status'],
          pago.planDate = plan.data()['start_date'],
          this.fbstore.collection('prices', ref => ref.where('price','==',plan.data()['price'])).snapshotChanges().subscribe(pri => {
            pri.map( result => {
              pago.type = result.payload.doc.data()['type']
            })
          })
        })
      })
    } )
  }

  async factura() {
    this.loader = await this.loadingCtrl.create({
      message: 'Enviando...',
      mode: 'ios'
    })
    this.loader.present()
    let factura = {
      from: this._user.userID,
      pago: this.facturaForm.get('pago').value,
      name: this.facturaForm.get('name').value,
      rfc: this.facturaForm.get('rfc').value,
      address: this.facturaForm.get('address').value,
      email: this.facturaForm.get('email').value,
      message: this.facturaForm.get('message').value,
      status: 'pending',
      creationTime: new Date().getTime()
    }
    
    this.fbstore.collection('invoice').add(factura).then(async invoice => {
      this.loadingCtrl.dismiss()
      const alert = await this.alertCtrl.create({
        header: 'Solicitud enviada',
        message: 'Estamos procesando tu solicitud, la respuesta sera enviada a tu e-mail',
        buttons:[
          {
            text: 'Ok',
            handler: () => {
              this.modalCtrl.dismiss()              
            }
          }
        ],
        mode: 'ios'
      })
      await alert.present()
    }).catch( async (error) => {
      this.loadingCtrl.dismiss()
      const alert = await this.alertCtrl.create({
        header: 'Error en la solicitud',
        message: error,
        buttons:[
          {
            text: 'Ok',
            handler: () => {
              this.modalCtrl.dismiss()              
            }
          }
        ],
        mode: 'ios'
      })
      await alert.present()
    })
    
    //this.modalCtrl.dismiss()
  }

  cancelar() {
    this.modalCtrl.dismiss()
  }

}
