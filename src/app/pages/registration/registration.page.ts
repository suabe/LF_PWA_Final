import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms'
import { ToastService } from '../../services/toast.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { IonSlides, MenuController, AlertController, IonContent } from '@ionic/angular';
import { Validator } from '../../helpers/validation.helpers';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LanguageService } from '../../services/language.service';
import { IonIntlTelInputModel, IonIntlTelInputValidators } from 'ion-intl-tel-input';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class RegistrationPage implements OnInit {
  phone: IonIntlTelInputModel = {
    dialCode: '+92',
    internationalNumber: '+92 300 1234567',
    isoCode: 'pk',
    nationalNumber: '300 1234567'
  }
  @ViewChild('sliderRegistro') slides: IonSlides;
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
    phone: new FormControl({
      internationalNumber: '',
      nationalNumber: '',
      isoCode: 'mx'
    },[Validators.required,Validators.minLength(10),IonIntlTelInputValidators.phone]),
    termCond: new FormControl(false,[Validators.required,Validators.pattern('true')]),
    privacidad: new FormControl(false,[Validators.required,Validators.pattern('true')])
  });
  registroSPForm = new FormGroup({
    email: new FormControl( '',[Validators.required,Validators.email]),
    password: new FormControl ('', [Validators.required, Validators.minLength(6)]),
    name: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    gender: new FormControl('',Validators.required),
    birthDate: new FormControl('',Validators.required),
    phone: new FormControl({
      internationalNumber: '',
      nationalNumber: '',
      isoCode: 'mx'
    },[Validators.required,Validators.minLength(10),IonIntlTelInputValidators.phone]),
    idioma: new FormControl('',Validators.required),
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
    public languageService: LanguageService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.centered = true;
    config.scrollable = true;
    this.current = languageService.current    
  }

  checkCheckbox(c: AbstractControl){
    if(c.get('termsAndConditions').value == false){
      return false;
    }else return true;
  }

  ngOnInit() {
    //this.slides.lockSwipes(true);
    this.menu.enable(false,'main');
    this.fbstore.collection('managerOptions').doc('privacy').get().subscribe(data => {
      console.log('privacidad',data);
      
    });
  }
  ionViewDidEnter() {
    this.menu.enable(false,'main');
    this.slides.lockSwipes(true);
    this.getIndex();
    console.log('lenguaje =>',this.languageService.current);
    
    
  }
  

  ionViewWillLeave() {
    this.registroForm.reset()
    this.registroSPForm.reset()
  }

  ionViewWillEnter() {
    this.menu.enable(false,'primerMenu');
  }

  ngOnDestroy() {
    //this.menu.enable(true,'main');
  }

  signUp(email, password){
    this.authService.RegisterUser(email.value, password.value)
    .then((res) => {
      // Do something here
      this.authService.SendVerificationMail();
    }).catch((error) => {
      window.alert(error.message)
    })
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
          this.router.navigate(['registro-plan']);
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

  registroSpeaker() {
    let usuario = {
      email: this.registroSPForm.get('email').value,
      password: this.registroSPForm.get('password').value,
      name: this.registroSPForm.get('name').value,
      lastName: this.registroSPForm.get('lastName').value,
      gender: this.registroSPForm.get('gender').value,
      birthDate: this.registroSPForm.get('birthDate').value,
      phone: this.registroSPForm.get('phone').value['nationalNumber'],
      // bio: this.registroSPForm.get('bio').value,
      //spei: this.registroSPForm.get('spei').value,
      // cinbanck: this.registroSPForm.get('spei').value,
      idioma: this.registroSPForm.get('idioma').value,
      code: this.registroSPForm.get('phone').value['internationalNumber'],
      country: this.registroSPForm.get('phone').value['isoCode'],
      status: 'pending',
      creado: new Date().getTime()
    }
    console.log(usuario);
    this.fbstore.collection('perfiles', ref => ref.where('email','==',this.registroSPForm.get('email').value)).get().subscribe(async user => {
      console.log(user.empty);
      if (user.empty) {
        this.fbstore.collection('potenciales').add(usuario).then( (potencialID) => {
          this.router.navigate(['login']);
          this.toastservice.showToast('Registro Exitoso, te hemos enviado a tu correo las instrucciones para completar tu Registro', 5000)
        }).catch( (error) => {
          console.error('Error writing new message to database', error);
        })
      } else {
        let alert = await this.alertCtl.create({
          cssClass: 'my-custom-class',
          header: '¡Error en el registro!',
          message: 'Ya existe un usurio con el mismo e-mail',
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
    })
    
  }

  mostraMenu() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
    this.getIndex();
  }

  mostratRegCli() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
    this.getIndex();
  }

  mostratRegConv() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(2);
    this.slides.lockSwipes(true);
    this.getIndex();
  }

  async getIndex() {
    await this.slides.getActiveIndex().then(slide => {
      if (slide === 0) {
        this.fillUser = 'naranja';
        this.fillConv = 'outline'

      } if (slide === 2) {
        // console.log('conver');
        this.fillUser = 'azul';
        this.fillConv = 'solid'
      }

    })
  }

  telInputObject(obj) {
    console.log('telInputObject',obj);
    
    // obj.intlTelInput('setCountry', 'mx');
  }
  onCountryChange(obj) {
    console.log('onCountryChange',obj.iso2);
    this.country = obj.iso2
   //this.countryCode = obj.dialCode
  }
  hasError(obj) {
    //console.log('hasError',obj);
    if (obj) {
      console.log('sin error');
      this.registroForm.controls['phone'].setErrors(null)
    } else {
      console.log('hay error');
      this.registroForm.controls['phone'].setErrors({'incorrect': true})
    }
  }

  getNumber(obj) {
    console.log('getNumber',obj);
    this.countryCode = obj
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
