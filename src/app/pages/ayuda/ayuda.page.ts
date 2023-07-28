import { Component, OnInit } from '@angular/core';
import { DataUsuarioService } from '../../services/data-usuario.service';
import { ModalController } from '@ionic/angular';
import { AyudaSoportePage } from '../ayuda-soporte/ayuda-soporte.page';
import { AyudaFacturaPage } from '../ayuda-factura/ayuda-factura.page';
import { AngularFirestore } from '@angular/fire/firestore';
import { LanguageService } from '../../services/language.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.page.html',
  styleUrls: ['./ayuda.page.scss'],
})
export class AyudaPage implements OnInit {
  color = 'azul';
  pagos
  hayPagos: boolean = false;
  current
  questions
  hayQuestions: boolean = false
  constructor(
    public _user: DataUsuarioService,
    public modalCtrl: ModalController,
    private afStore: AngularFirestore,
    private languageService: LanguageService,
    private translate: TranslateService
  ) { 
    
    
  }

  ionViewDidEnter() {
    let lng = this.translate.currentLang
    if (this._user.dataUser.role === 'cliente') {
      this.color = 'naranja'
    }
    this.getPagos();
    this.getQuestions(lng);
  }
  
  ionViewWillEnter() {
    
      
  }  

  ngOnInit() {
    
  }

  async soporte() {
    const modal = await this.modalCtrl.create({
      component: AyudaSoportePage
    })

    await modal.present()
  }

  async factura() {
    const modal = await this.modalCtrl.create({
      component: AyudaFacturaPage
    })
    await modal.present()
  }

  async getQuestions(lng) {
    await this.afStore.collection('faqs', ref => ref.where('language','==',lng)).snapshotChanges()
    .subscribe( data => {
      this.questions = data.map( result => {
        return result.payload.doc.data()
      })
      if (this.questions.length > 0) {
        this.hayQuestions = true
      }
      
    } )
  }


  async getPagos() {
    await  this.afStore.collection('pagos', ref => ref.where('uid','==',this._user.userID)).snapshotChanges()
    .subscribe( data => {
      this.pagos = data.map( result => {
        // console.log('Pagos=>',result);
        return {
          id: result.payload.doc.id,
          invoice: result.payload.doc.data()['invoice'],
          pagado: result.payload.doc.data()['amount_paid'],
          created: result.payload.doc.data()['created'],
          subscription: result.payload.doc.data()['subscription'],
          customer: result.payload.doc.data()['customer'],
          plan: '',
          lang: '',
          planStatus: '',
          planDate: '',
          card: ''
        }
      })
      this.pagos.forEach((pago) => {
        this.afStore.collection('plans').doc(pago.subscription).get().subscribe(plan => {
          pago.plan = plan.data()['price'],
          pago.lang = plan.data()['idioma'],
          pago.planStatus = plan.data()['status'],
          pago.planDate = plan.data()['start_date']
        })
        this.afStore.collection('wallet', ref => ref.where('customer','==',pago.customer)).snapshotChanges().subscribe(cus => {
          cus.map( result => {
            pago.card = result.payload.doc.data()['card']
          })
          
        })
      })
      if (this.pagos.length > 0) {
        this.hayPagos = true
      }
      
      
    } )
  }
  

}
