import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { DataUsuarioService } from '../../services/data-usuario.service';
import { IonIntlTelInputModel, IonIntlTelInputValidators } from 'ion-intl-tel-input';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFirestore } from '@angular/fire/firestore';
import { TranslateService } from '@ngx-translate/core';
import { SelectConfig } from 'moment-timezone-picker';


@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {
  loader
  phone: IonIntlTelInputModel = {
    dialCode: '+92',
    internationalNumber: '+92 300 1234567',
    isoCode: 'pk',
    nationalNumber: '300 1234567'
  }
  color = 'azul';
  countryCode = '';
  registroForm = new FormGroup({    
    name: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    gender: new FormControl('',Validators.required),
    birthDate: new FormControl('',Validators.required),
    idioma: new FormControl('', Validators.required),
    phone: new FormControl({
      internationalNumber: '',
      nationalNumber: '',
      isoCode: 'mx'
    },[Validators.required,Validators.minLength(10),IonIntlTelInputValidators.phone])
  });
  improForm = new FormGroup({
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
    timezone: new FormControl({
      abbr: "",
      group: "",
      name: "",
      nameValue: "",
      timeValue: ""
    },[Validators.required])
  })
  timezoneConfig: SelectConfig = {
    hideSelected: false,
    dropdownPosition: 'auto',
    appearance: 'underline',
    clearOnBackspace: true,
    closeOnSelect: true,
    appendTo: 'body'
  }
  constructor(
    private fbstore: AngularFirestore,
    private modalCtr: ModalController,
    public _user: DataUsuarioService,
    private functions: AngularFireFunctions,
    private auth: AngularFireAuth,
    public alerCtrl: AlertController,
    private loading: LoadingController,
    private translate: TranslateService
  ) { }
  
  ionViewWillEnter() {
    if (this._user.dataUser.role === 'cliente') {
      this.color = 'naranja';
      
    }            
  }

  ngOnInit() {
    if (this._user.dataUser.role === 'cliente') {
      this.improForm.setValue({
        name: this._user.dataUser.name,
        lastName: this._user.dataUser.lastName,
        gender: this._user.dataUser.gender,
        birthDate: this._user.dataUser.birthDate,
        bio: this._user.dataUser.bio,
        phone: {
          internationalNumber: this._user.dataUser.code,
          nationalNumber: this._user.dataUser.phone,
          isoCode: this._user.dataUser.country
        },
        timezone: {
          abbr: this._user.dataUser.timezone.abbr,
          group: this._user.dataUser.timezone.group,
          name: this._user.dataUser.timezone.name,
          nameValue: this._user.dataUser.timezone.nameValue,
          timeValue: this._user.dataUser.timezone.timeValue
        }
      })
    } else {
      this.registroForm.setValue({
        name: this._user.dataUser.name,
        lastName: this._user.dataUser.lastName,
        gender: this._user.dataUser.gender,
        birthDate: this._user.dataUser.birthDate,        
        phone: {
          internationalNumber: this._user.dataUser.code,
          nationalNumber: this._user.dataUser.phone,
          isoCode: this._user.dataUser.country
        },
        idioma: this._user.dataUser.idioma
      })

    }
  }

  async actualiza() {
    const alert = await this.alerCtrl.create({
      mode: 'ios',
      header: this.translate.instant('EDITPERFIL.ALERTCONFTITLE'),
      subHeader: this.translate.instant('EDITPERFIL.ALERTCONFMSG'),
      inputs: [
        {
          name: 'password',
          type: 'password',
          placeholder: this.translate.instant('EDITPERFIL.ALERTCONFPSW')
        }
      ],
      buttons: [
        {
          text: this.translate.instant('EDITPERFIL.ALERTCANCEL'),
          role: 'cancel',
          handler: data => {
            
          }
        },
        {
          text: this.translate.instant('EDITPERFIL.ALERTSAVE'),
          handler: async data => {
            let cUser = (await this.auth.currentUser).email
            this.loader = await this.loading.create({
              message: this.translate.instant('EDITPERFIL.LOADING'),
              mode: 'ios',
              spinner: 'bubbles'
            })
            this.loader.present();
            const credentials = this.auth.signInWithEmailAndPassword(cUser,data.password)
            credentials.then(
              async success => {
                let user = {                  
                  birthDate: this.improForm.get('birthDate').value,
                  gender: this.improForm.get('gender').value,
                  name: this.improForm.get('name').value,
                  lastName: this.improForm.get('lastName').value,
                  phone: this.improForm.get('phone').value['nationalNumber'],
                  bio: this.improForm.get('bio').value,
                  code: this.improForm.get('phone').value['internationalNumber'],
                  country: this.improForm.get('phone').value['isoCode'],
                  timezone: this.improForm.get('timezone').value
                };
                
                await this.fbstore.collection('perfiles').doc(this._user.userID).update(user).then(
                  async success => {
                    let alert = await this.alerCtrl.create({
                      cssClass: 'my-custom-class',
                      header: this.translate.instant('EDITPERFIL.ALERTEDITTITLE'),
                      message: this.translate.instant('EDITPERFIL.ALERTEDITMSG'),
                      mode: 'ios',
                      buttons: [
                        {
                          text: this.translate.instant('EDITPERFIL.ALERTEDITBTNOK'),
                          handler: (blah) => {
                                                        
                          }
                        }
                      ]
                    })
                    this.loader.dismiss();
                    await alert.present();
                  }, async error => {
                    let alert = await this.alerCtrl.create({
                      cssClass: 'my-custom-class',
                      header: this.translate.instant('EDITPERFIL.ALERTEDITTITLE'),
                      message: this.translate.instant('EDITPERFIL.ALERTEDITMSGERROR'),
                      mode: 'ios',
                      buttons: [
                        {
                          text: this.translate.instant('EDITPERFIL.ALERTEDITBTNOK'),
                          handler: (blah) => {
                                                        
                          }
                        }
                      ]
                    })
                    this.loader.dismiss();
                    await alert.present();
                  })
                
              }, async error => {
                let alert = await this.alerCtrl.create({
                  cssClass: 'my-custom-class',
                  header: this.translate.instant('EDITPERFIL.ALERTEDITTITLE'),
                  message: this.translate.instant('EDITPERFIL.ALERTEDITMSGERRORPWS'),
                  mode: 'ios',
                  buttons: [
                    {
                      text: this.translate.instant('EDITPERFIL.ALERTEDITBTNOK'),
                      handler: (blah) => {
                                                
                      }
                    }
                  ]
                })
                this.loader.dismiss();
                await alert.present();
              }
            )
            this.modalCtr.dismiss();
          }
        }
      ]
    })

    await alert.present();
  }

  async actualizaSP() {
    const alert = await this.alerCtrl.create({
      mode: 'ios',
      header: this.translate.instant('EDITPERFIL.ALERTCONFTITLE'),
      subHeader: this.translate.instant('EDITPERFIL.ALERTCONFMSG'),
      inputs: [
        {
          name: 'password',
          type: 'password',
          placeholder: this.translate.instant('EDITPERFIL.ALERTCONFPSW')
        }
      ],
      buttons: [
        {
          text: this.translate.instant('EDITPERFIL.ALERTCANCEL'),
          role: 'cancel',
          handler: data => {
            
          }
        },
        {
          text: this.translate.instant('EDITPERFIL.ALERTSAVE'),
          handler: async data => {
            console.log(data);
            let cUser = (await this.auth.currentUser).email
            this.loader = await this.loading.create({
              message: this.translate.instant('EDITPERFIL.LOADING'),
              mode: 'ios',
              spinner: 'bubbles'
            })
            this.loader.present();
            const credentials = this.auth.signInWithEmailAndPassword(cUser,data.password)
            credentials.then(
              async success => {
                let user = {                  
                  birthDate: this.registroForm.get('birthDate').value,
                  gender: this.registroForm.get('gender').value,
                  name: this.registroForm.get('name').value,
                  lastName: this.registroForm.get('lastName').value,
                  idioma: this.registroForm.get('idioma').value,
                  phone: this.registroForm.get('phone').value['nationalNumber'],
                  code: this.registroForm.get('phone').value['internationalNumber'],
                  country: this.registroForm.get('phone').value['isoCode']
                };
                
                await this.fbstore.collection('perfiles').doc(this._user.userID).update(user).then(
                  async success => {
                    let alert = await this.alerCtrl.create({
                      cssClass: 'my-custom-class',
                      header: this.translate.instant('EDITPERFIL.ALERTEDITTITLE'),
                      message: this.translate.instant('EDITPERFIL.ALERTEDITMSG'),
                      mode: 'ios',
                      buttons: [
                        {
                          text: this.translate.instant('EDITPERFIL.ALERTEDITBTNOK'),
                          handler: (blah) => {
                                                        
                          }
                        }
                      ]
                    })
                    this.loader.dismiss();
                    await alert.present();
                  }, async error => {
                    let alert = await this.alerCtrl.create({
                      cssClass: 'my-custom-class',
                      header: this.translate.instant('EDITPERFIL.ALERTEDITTITLE'),
                      message: this.translate.instant('EDITPERFIL.ALERTEDITMSGERROR'),
                      mode: 'ios',
                      buttons: [
                        {
                          text: this.translate.instant('EDITPERFIL.ALERTEDITBTNOK'),
                          handler: (blah) => {
                                                        
                          }
                        }
                      ]
                    })
                    this.loader.dismiss();
                    await alert.present();
                  })
                
              }, async error => {
                let alert = await this.alerCtrl.create({
                  cssClass: 'my-custom-class',
                  header: this.translate.instant('EDITPERFIL.ALERTEDITTITLE'),
                  message: this.translate.instant('EDITPERFIL.ALERTEDITMSGERRORPWS'),
                  mode: 'ios',
                  buttons: [
                    {
                      text: this.translate.instant('EDITPERFIL.ALERTEDITBTNOK'),
                      handler: (blah) => {
                                                
                      }
                    }
                  ]
                })
                this.loader.dismiss();
                await alert.present();
              }
            )
            this.modalCtr.dismiss();
          }
        }
      ]
    })

    await alert.present();
  }

  cerrarModal() {
    this.modalCtr.dismiss();
  }

  telInputObject(obj) {
      
  }
  onCountryChange(obj) {
   
  }
  hasError(obj) {
    
    if (obj) {
      
      this.registroForm.controls['phone'].setErrors(null)
    } else {
      
      this.registroForm.controls['phone'].setErrors({'incorrect': true})
    }
  }

  getNumber(obj) {
    
    this.countryCode = obj
  }


}
