import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { DataUsuarioService } from '../../services/data-usuario.service';
import { TranslateService } from '@ngx-translate/core';
import { IonIntlTelInputModel, IonIntlTelInputValidators } from 'ion-intl-tel-input';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-cambiar-tel',
  templateUrl: './cambiar-tel.page.html',
  styleUrls: ['./cambiar-tel.page.scss'],
})
export class CambiarTelPage implements OnInit {
  loader
  phone: IonIntlTelInputModel = {
    dialCode: '+92',
    internationalNumber: '+92 300 1234567',
    isoCode: 'pk',
    nationalNumber: '300 1234567'
  }
  color = 'azul';
  changeTelForm = new FormGroup({
    tel: new FormControl({
      internationalNumber: '',
      nationalNumber: '',
      isoCode: 'mx'
    },[Validators.required,Validators.minLength(10),IonIntlTelInputValidators.phone])
  });
  constructor(
    private fbstore: AngularFirestore,
    private modalCtr: ModalController,
    public _user: DataUsuarioService,        
    public alerCtrl: AlertController,
    private loading: LoadingController,
    private translate: TranslateService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    if (this._user.dataUser.role === 'cliente') {
      this.color = 'naranja';
      
    } 
    this.changeTelForm.setValue({
      tel: {
        internationalNumber: this._user.dataUser.code,
        nationalNumber: this._user.dataUser.phone,
        isoCode: this._user.dataUser.country
      }
    })
  }

  async guardarTel() {
    this.loader = await this.loading.create({
      message: this.translate.instant('EDITPERFIL.LOADING'),
      mode: 'ios',
      spinner: 'bubbles'
    })
    this.loader.present();
    let user = {
      phone: this.changeTelForm.get('tel').value['nationalNumber'],
      code: this.changeTelForm.get('tel').value['internationalNumber'],
      country: this.changeTelForm.get('tel').value['isoCode']
    }
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
                
                this.modalCtr.dismiss();
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
  }

  cerrarModal() {
    this.modalCtr.dismiss();
  }

}
