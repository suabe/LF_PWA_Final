import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataUsuarioService } from '../../services/data-usuario.service';
import {AngularFireFunctions} from '@angular/fire/functions'
import { AngularFireAuth } from '@angular/fire/auth';
import { ConfirmedValidator } from './perfil-password.validator';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-perfil-password',
  templateUrl: './perfil-password.page.html',
  styleUrls: ['./perfil-password.page.scss'],
})
export class PerfilPasswordPage implements OnInit {
  cambioPswForm = new FormGroup({})
  loader
  color = 'azul';
  constructor(
    private alertCtl: AlertController,
    public route: Router,
    public _user: DataUsuarioService,
    private functions: AngularFireFunctions,
    private auth: AngularFireAuth,
    private fb: FormBuilder,
    private loading: LoadingController,
    private translate: TranslateService
  ) {
    this.cambioPswForm = fb.group({
      oldPsw: new FormControl('',[Validators.required]),
      newPsw: new FormControl('',[Validators.required]),
      cNewpsw: new FormControl('',[Validators.required])
    },{validator: ConfirmedValidator('newPsw','cNewpsw')})
   }

   get f(){
    return this.cambioPswForm.controls;
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (this._user.dataUser.role === 'cliente') {
      this.color = 'naranja'
    }
  }

  ionViewWillLeave() {
    this.cambioPswForm.reset()
  }

  async cambioPsw() { 
    let cUser = (await this.auth.currentUser).email
    this.loader = await this.loading.create({
      message: this.translate.instant('EDITPASSWORD.LOADING'),
      mode: 'ios',
      spinner: 'bubbles'
    })
    this.loader.present();
    const credentials = this.auth.signInWithEmailAndPassword(cUser,this.cambioPswForm.get('oldPsw').value)
    let data = this.cambioPswForm.value
    credentials.then(
      async success => {
        const user = (await this.auth.currentUser);
        user.updatePassword(this.cambioPswForm.get('newPsw').value).then(
          async success => {
            this.auth.signInWithEmailAndPassword(cUser,this.cambioPswForm.get('newPsw').value)
            console.log('cambiado');
            this.loader.dismiss();
            this.route.navigateByUrl('/perfil-options')
          }, async error => {
            console.error(error);
            this.loader.dismiss();
          }
        )
      }, async error => {
        let alert = await this.alertCtl.create({
          cssClass: 'my-custom-class',
          header: this.translate.instant('EDITPASSWORD.ALERTTITLE'),
          message: this.translate.instant('EDITPASSWORD.ALERTMSGERROR'),
          mode: 'ios',
          buttons: [
            {
              text: 'Ok',
              handler: (blah) => {
                console.log('Boton Ok');
                
              }
            }
          ]
        })
        this.loader.dismiss();
        await alert.present();
      }
    )
    console.log(credentials);
    
  }

  async cambiar() {
    const userNewCredential = {email: 'user-email', password: 'your-new-password'};
    this.functions.httpsCallable('resetUserPassword') 
    (userNewCredential).toPromise().then((updatedUser) => {
      console.log(updatedUser);
    }).catch((error) => console.log(error));
    let alert = await this.alertCtl.create({
      cssClass: 'my-custom-class',
      header: this.translate.instant('EDITPASSWORD.ALERTTITLE'),
      message: this.translate.instant('EDITPASSWORD.ALERTMSG'),
      mode: 'ios',
      buttons: [
        {
          text: 'Ok',
          handler: (blah) => {
            console.log('Boton Ok');
            this.route.navigate(['/perfil-options'])
          }
        }
      ]
    })
    await alert.present();
  }

}
