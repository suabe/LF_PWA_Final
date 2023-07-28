import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { IonIntlTelInputModel, IonIntlTelInputValidators } from 'ion-intl-tel-input';
import { IonContent, MenuController, AlertController } from '@ionic/angular';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { ToastService } from '../../services/toast.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, ActivatedRoute  } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { SelectConfig } from 'moment-timezone-picker';

@Component({
  selector: 'app-registro-improver',
  templateUrl: './registro-improver.page.html',
  styleUrls: ['./registro-improver.page.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class RegistroImproverPage implements OnInit {
  phone: IonIntlTelInputModel = {
    dialCode: '+92',
    internationalNumber: '+92 300 1234567',
    isoCode: 'pk',
    nationalNumber: '300 1234567'
  }
  @ViewChild('term') content: IonContent;
  @ViewChild('scroll', { read: ElementRef }) public scroll: ElementRef<any>;
  fillUser = {};
  fillConv = {};
  countryCode = '';
  country = 'mx';
  registroForm = new FormGroup({
    email: new FormControl( '',[Validators.required,Validators.email]),
    password: new FormControl ('', [Validators.required, Validators.minLength(6)]),
    name: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    gender: new FormControl('',Validators.required),
    birthDate: new FormControl('',Validators.required),
    bio: new FormControl('',Validators.required),
    timezone: new FormControl('', Validators.required),
    phone: new FormControl({
      internationalNumber: '',
      nationalNumber: '',
      isoCode: 'mx'
    },[Validators.required,Validators.minLength(10),IonIntlTelInputValidators.phone]),
    termCond: new FormControl(false,[Validators.required,Validators.pattern('true')]),
    privacidad: new FormControl(false,[Validators.required,Validators.pattern('true')])
  });
  termCond
  privacidad
  lang;
  current
  listLang = [
    { text: 'EN', flag: 'assets/imags/flags/us.jpg', lang: 'en' },
    { text: 'ES', flag: 'assets/imags/flags/spain.jpg', lang: 'es' },
  ];
  txtTerms
  txtPrivacy
  timezoneConfig: SelectConfig = {
    hideSelected: false,
    dropdownPosition: 'auto',
    appearance: 'underline',
    clearOnBackspace: true,
    closeOnSelect: true,
    appendTo: 'body'
  }
  constructor(
    private authService: AuthenticationService,
    public addnewFormbuilder: FormBuilder,
    public toastservice: ToastService,
    private fbstore: AngularFirestore,
    public router:  Router,
    private menu: MenuController,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private alertCtl: AlertController,
    public languageService: LanguageService,
    private actyveRouter: ActivatedRoute
  ) { 
    config.backdrop = 'static';
    config.keyboard = false;
    config.centered = true;
    config.scrollable = true;
    this.current = languageService.current
   }

  ngOnInit() {
    this.menu.enable(false,'main');
    this.fbstore.collection('managerOptions').doc('privacy').get().subscribe(data => {
      //console.log('privacidad',data.data());
      this.txtPrivacy = data.data();
    });
    this.fbstore.collection('managerOptions').doc('terms').get().subscribe(data => {
      //console.log('privacidad',data.data());
      this.txtTerms = data.data();
    });
    this.actyveRouter.queryParams.subscribe(params => {
      if (params) {
        console.log(params);
        //localStorage.setItem('plan', params.tipo);
      }
      
    })

    let hoy = new Date()
    let day = hoy.getDate()
    let month = hoy.getMonth() + 1
    let year = hoy.getFullYear()
    console.log('fecha', year+'/'+month+'/'+day);
    //console.log(hoy.toTimeString());
    
  }
  ionViewDidEnter() {
    this.menu.enable(false,'main');
  }
  

  ionViewWillLeave() {
    this.registroForm.reset();
  }

  ionViewWillEnter() {
    this.menu.enable(false,'primerMenu');
  }

  ngOnDestroy() {
    this.menu.enable(true,'main');
  }

  registro(rol: string) {
    let usuario = {
      email: this.registroForm.get('email').value,
      //password: this.registroForm.get('password').value,
      name: this.registroForm.get('name').value,
      lastName: this.registroForm.get('lastName').value,
      gender: this.registroForm.get('gender').value,
      birthDate: this.registroForm.get('birthDate').value,
      phone: this.registroForm.get('phone').value['nationalNumber'],
      bio: this.registroForm.get('bio').value,
      //idref: this.registroForm.get('idref').value,
      code: this.registroForm.get('phone').value['internationalNumber'],
      country: this.registroForm.get('phone').value['isoCode'],
      timezone: this.registroForm.get('timezone').value,
      role: rol,
      status: 'active',
      enllamada: false,
      creado: new Date().getTime()
    }
     console.log(usuario);

    this.authService.RegisterUser(usuario.email, this.registroForm.get('password').value)
    .then(async (res) => {
      // Do something here

      console.log('se registro usuario',res.user.uid);
      try {
        await this.fbstore.doc('perfiles/'+res.user.uid).set(usuario).then(data => {
          //console.log('se creo perfil',data);
          //this.authService.SendVerificationMail();
          //this.router.navigate(['agrega-plan']);
          this.router.navigate(['add-plans'],{replaceUrl: true});
        })

      }catch(error) {
        this.toastservice.showToast(error.message, 2000);
        let alert = await this.alertCtl.create({
          cssClass: 'my-custom-class',
          header: '¡Error en el registro!',
          message: error.message,
          mode: 'ios',
          buttons: [
            {
              text: 'Aceptar',
              handler: (blah) => {
                console.log('Boton Ok');
                
              }
            }
          ]
        })
        await alert.present();
      }

    }).catch(async (error) => {
      //window.alert(error.message)
      this.toastservice.showToast(error.message, 2000);
      let alert = await this.alertCtl.create({
        cssClass: 'my-custom-class',
        header: '¡Error en el registro!',
        message: error.message,
        mode: 'ios',
        buttons: [
          {
            text: 'Aceptar',
            handler: (blah) => {
              console.log('Boton Ok');
              
            }
          }
        ]
      })
      await alert.present();
    })

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

  setLanguage(lang) {
    this.languageService.setLanguage(lang.detail.value);
    this.current = lang.detail.value
  }

}
