import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, MenuController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataUsuarioService } from '../../services/data-usuario.service';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../../services/toast.service';
import { AgregaTarjetaPage } from '../agrega-tarjeta/agrega-tarjeta.page';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LanguageService  } from '../../services/language.service';

@Component({
  selector: 'app-registro-plan',
  templateUrl: './registro-plan.page.html',
  styleUrls: ['./registro-plan.page.scss'],
})
export class RegistroPlanPage implements OnInit {
  host: any;
  wallet
  planes
  precio
  loader
  termCond
  privacidad
  langSelec
  precios
  planSelect
  customPopoverOptions: any = {
    cssClass: 'popPlans'
  }
  addPlans = new FormGroup({
    planes: new FormGroup({
      es: new FormGroup({
        ln: new FormControl(undefined),
        plan: new FormControl(''),
        schedule: new FormControl('')
      }),
      en: new FormGroup({
        ln: new FormControl(undefined),
        plan: new FormControl(''),
        schedule: new FormControl('')
      }),
      fr: new FormGroup({
        ln: new FormControl(undefined),
        plan: new FormControl(''),
        schedule: new FormControl('')
      }),
      cn: new FormGroup({
        ln: new FormControl(undefined),
        plan: new FormControl(''),
        schedule: new FormControl('')
      }),
    }),
    idref: new FormControl('',[Validators.minLength(8)]),
    tarjeta: new FormControl('',[Validators.required])    
  })
  constructor(
    private router: Router,
    public modalCtrl: ModalController,
    public afStore: AngularFirestore,
    public _user: DataUsuarioService,
    private menu: MenuController,
    public http: HttpClient,
    public _toast: ToastService,
    public loading: LoadingController,
    private modalService: NgbModal,
    private lang: LanguageService,
    config: NgbModalConfig
  ) { 
    //this.host = 'http://localhost:5001/ejemplocrud-e7eb1/us-central1/';
    this.host = 'https://us-central1-ejemplocrud-e7eb1.cloudfunctions.net/';
   }

  ngOnInit() {
    this.menu.enable(false,'main');
    this.langSelec = this.lang.current
    
    this.addPlans.get('planes')
    //Asignar validacion si se selecciona el idioma
    //Sehabilitamos los selecs, hasta que se seleccione un idioma
    this.addPlans.get('planes.es.plan').disable()
    this.addPlans.get('planes.es.schedule').disable()
    this.addPlans.get('planes.en.plan').disable()
    this.addPlans.get('planes.en.schedule').disable()
    this.addPlans.get('planes.fr.plan').disable()
    this.addPlans.get('planes.fr.schedule').disable()
    this.addPlans.get('planes.cn.plan').disable()
    this.addPlans.get('planes.cn.schedule').disable()
    //Español
    this.addPlans.get('planes.es.ln').valueChanges.subscribe(valor => {
      this.addPlans.get('planes.es.plan').disable()
      this.addPlans.get('planes.es.schedule').disable()
      this.addPlans.get('planes.es.plan').clearValidators()
      this.addPlans.get('planes.es.schedule').clearValidators()
      console.log('valor=>', valor);
      if (valor) {
        this.addPlans.get('planes.es.plan').enable()
        this.addPlans.get('planes.es.schedule').enable()
        this.addPlans.get('planes.es.plan').setValidators([Validators.required])
        this.addPlans.get('planes.es.schedule').setValidators([Validators.required])
      }
      this.addPlans.get('planes.es.plan').updateValueAndValidity()
      this.addPlans.get('planes.es.schedule').updateValueAndValidity()
    })
    //Ingles
    this.addPlans.get('planes.en.ln').valueChanges.subscribe(valor => {
      this.addPlans.get('planes.en.plan').disable()
      this.addPlans.get('planes.en.schedule').disable()
      this.addPlans.get('planes.en.plan').clearValidators()
      this.addPlans.get('planes.en.schedule').clearValidators()
      console.log('valor=>', valor);
      if (valor) {
        this.addPlans.get('planes.en.plan').enable()
        this.addPlans.get('planes.en.schedule').enable()
        this.addPlans.get('planes.en.plan').setValidators([Validators.required])
        this.addPlans.get('planes.en.schedule').setValidators([Validators.required])
      }
      this.addPlans.get('planes.en.plan').updateValueAndValidity()
      this.addPlans.get('planes.en.schedule').updateValueAndValidity()
    })
    //Frances
    this.addPlans.get('planes.fr.ln').valueChanges.subscribe(valor => {
      this.addPlans.get('planes.fr.plan').disable()
      this.addPlans.get('planes.fr.schedule').disable()
      this.addPlans.get('planes.fr.plan').clearValidators()
      this.addPlans.get('planes.fr.schedule').clearValidators()
      console.log('valor=>', valor);
      if (valor) {
        this.addPlans.get('planes.fr.plan').enable()
        this.addPlans.get('planes.fr.schedule').enable()
        this.addPlans.get('planes.fr.plan').setValidators([Validators.required])
        this.addPlans.get('planes.fr.schedule').setValidators([Validators.required])
      }
      this.addPlans.get('planes.fr.plan').updateValueAndValidity()
      this.addPlans.get('planes.fr.schedule').updateValueAndValidity()
    })
    //Chino
    this.addPlans.get('planes.cn.ln').valueChanges.subscribe(valor => {
      this.addPlans.get('planes.cn.plan').disable()
      this.addPlans.get('planes.cn.schedule').disable()
      this.addPlans.get('planes.cn.plan').clearValidators()
      this.addPlans.get('planes.cn.schedule').clearValidators()
      console.log('valor=>', valor);
      if (valor) {
        this.addPlans.get('planes.cn.plan').enable()
        this.addPlans.get('planes.cn.schedule').enable()
        this.addPlans.get('planes.cn.plan').setValidators([Validators.required])
        this.addPlans.get('planes.cn.schedule').setValidators([Validators.required])
      }
      this.addPlans.get('planes.cn.plan').updateValueAndValidity()
      this.addPlans.get('planes.cn.schedule').updateValueAndValidity()
    })
  }

  async ionViewWillEnter() {
    this.getWallet()
    this.getPlans()
    await this.getPrecios()
    if (!this.planes) {
      this.menu.enable(false,'main');
    } else {
      this.menu.enable(true,'main');
    }
    
  }

  // ionViewDidEnter() {
  //   let tipo = localStorage.getItem('plan');
  //   console.log(tipo);
    
  //   if (tipo) {
  //     this.planSelect = this.precios.filter(precio => 'Fluency 10/3' == precio.type)
  //   }
  // }

  ionViewWillLeave() {
    this.menu.enable(true,'main');
    this.addPlans.reset()
  }
  ngOnDestroy() {
    this.menu.enable(true,'main');
  }

  async getPrecios() {
    let country = this._user.dataUser.country
    let res = []
    await this.afStore.collection('prices', ref => ref.where('zone','==', country)).get().subscribe(async data => {
      if (!data.empty) {
        data.forEach(doc => {
          res.push(doc.data())          
        })
        this.precios = res
        console.log('pais =>', this.precios);
        
      } else {
        await this.afStore.collection('prices', ref => ref.where('zone','==', 'all')).get().subscribe(data => {
          data.forEach(doc => {
            res.push(doc.data())          
          })
          this.precios = res
          console.log('sin pais =>', this.precios);
        })
      }
      let tipo = localStorage.getItem('plan');
      if (tipo == 'fluency') {
        let filtro = this.precios.filter(precio => 'Fluency 10/3' == precio.type)
        this.planSelect = filtro[0]['price'];
        console.log(this.planSelect);
      }
      if (tipo == 'plus') {
        let filtro = this.precios.filter(precio => '+ Fluency' == precio.type)
        this.planSelect = filtro[0]['price'];
        console.log(this.planSelect);
      }
      
    })
  }


  getPlans() {
    try {
      this.afStore.collection('plans', ref => ref.where('uid', '==', this._user.userID )).snapshotChanges()
      .subscribe( data => {
        this.planes = data.map( result => {
          return result.payload.doc.data()
        })
        
      } )
      
      
      
    } catch (error) {
      console.log('erro');
      
    }
  }

  async getWallet() {
    await this.afStore.collection('wallet', ref => ref.where('uid', '==', this._user.userID )).snapshotChanges()
    .subscribe( data => {
      this.wallet = data.map( result => {
        return result.payload.doc.data()
      })
      
      console.log(this._user.userID);
      
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
    console.log('wallte =>',data);
    
    
    this.addPlans.get('tarjeta').setValue(data.customer)
  }

  openModal(modal) {
    this.modalService.open(modal);
  }

  closeModal(modal) {
    if (modal == 'term') {
      this.termCond = true
    }
    if (modal == 'priv') {
      this.privacidad = true
    }
    this.modalService.dismissAll()
    console.log(modal);
  }

  async contrata() {
    this.loader = await this.loading.create({
      message: 'Procesando...',
      mode: 'ios',
      spinner: 'bubbles'
    })
    this.loader.present()
    let planes = this.addPlans.get('planes').value;
    let referido
    if (this.addPlans.get('idref').value) {
      console.log('capturo');
      this._user.buscaLFId(this.addPlans.get('idref').value).subscribe(user => {
        referido = user.map(result => { return result.payload.doc.data()})
        //console.log('capturo? ',this.addPlans.get('idref').value);
        
        if (referido.length >= 1) {
          console.log('con referido',referido);
          this.contratar(planes)
        } else {
          console.log('sin referido ',referido);
          this._toast.showToast('¡El ID de referido no existe!', 5000);
          this.loader.dismiss();
        }

      })
    } else {
      console.log('no capturo');
      this.contratar(planes)
    }
    
      
    
  }

  async contratar(planes) {    
    var i = 0;
    for( let plan in planes) {
      i++
      ((ind) => {
        setTimeout(() => {
          console.log(ind);
          // console.log('=>',this.addPlans.get('planes.'+plan+'.ln').value);
          if (this.addPlans.get('planes.'+plan+'.ln').value) {
            console.log(this.addPlans.get('planes.'+plan).value);
            this.http.post(this.host+'crearPlan', {
            customer: this.addPlans.get('tarjeta').value,
            priceId: this.addPlans.get('planes.'+plan+'.plan').value
            }).subscribe( async (data: any) => {
              if (data.id) {
                let plans = {
                  plan: data.id,
                  activa: true,
                  price: this.addPlans.get('planes.'+plan+'.plan').value,
                  enllamada: false,
                  creada: data.created,
                  creadaDate: new Date(),
                  uid: this._user.userID,
                  status: data.status,
                  start_date: data.start_date,
                  customer: data.customer,
                  idioma: plan,
                  schedule: this.addPlans.get('planes.'+plan+'.schedule').value,
                  idref: this.addPlans.get('idref').value
                }
                await this.afStore.collection('plans').doc(data.id).set(plans).then( data => {
                  //this.loader.dismiss();
                  this._toast.showToast('¡Se ha agregado un nuevo plan!', 5000);
                })
                
              } else {
                this.loader.dismiss();
                this.router.navigate(['plans'])
                this._toast.showToast('¡Error al crear plan!', 5000);                
              }
              
            } )
          }
          if(ind === 4){
              console.log('It was the last one');
              this.router.navigate(['plans']).then(()=>{
                this.loader.dismiss();
              })
          }
        }, 1000 + (3000 * i));
      })(i);
      
      
      
    }
  }

  doSetTimeout(i) {
    setTimeout(function() { console.log('planes a contratar',i);
     }, 4000);
  }

}
