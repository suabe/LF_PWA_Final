import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IonIntlTelInputModel, IonIntlTelInputValidators } from 'ion-intl-tel-input';
import { IonContent, MenuController, AlertController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { ToastService } from '../../services/toast.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-registro-speaker',
  templateUrl: './registro-speaker.page.html',
  styleUrls: ['./registro-speaker.page.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class RegistroSpeakerPage implements OnInit {
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
      console.log('privacidad',data.data());
      this.txtPrivacy = data.data();
    });
    this.fbstore.collection('managerOptions').doc('terms').get().subscribe(data => {
      //console.log('privacidad',data.data());
      this.txtTerms = data.data();
    });
  }
  ionViewDidEnter() {
    this.menu.enable(false,'main');
  }
  

  ionViewWillLeave() {
    this.registroSPForm.reset();
  }

  ionViewWillEnter() {
    this.menu.enable(false,'primerMenu');
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

    this.fbstore.collection('perfiles', ref => ref.where('email','==',this.registroSPForm.get('email').value)).get().subscribe( async perfil => {
      if (perfil.empty) {
        this.fbstore.collection('potenciales', ref => ref.where('email','==',this.registroSPForm.get('email').value)).get().subscribe(async user => {
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
