import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { DataUsuarioService } from 'src/app/services/data-usuario.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-acount-link',
  templateUrl: './acount-link.page.html',
  styleUrls: ['./acount-link.page.scss'],
})
export class AcountLinkPage implements OnInit {
  color = 'azul';
  generaLink = false;
  linkData
  acountData = false;
  loader
  payPalForm = new FormGroup({
    email: new FormControl('',(Validators.required, Validators.email))
  })
  constructor(
    private ngroute: Router,
    private _user: DataUsuarioService,
    private modalCtrl: ModalController,
    private http: HttpClient,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private translate: TranslateService,
    private fbstore: AngularFirestore,
    private _toast: ToastService
  ) { }

  ngOnInit() {
    
    
  }

  ionViewWillEnter() {
    if (this._user.dataUser.role === 'cliente') {
      this.color = 'naranja'
    }
    
  }

  async onSubmit() {
    this.loader = await this.loadingCtrl.create({
      message: this.translate.instant('ACOUNTLINK.LOADING'),
      mode: 'ios'
    })
    this.loader.present();
    let update = {
      csai: this.payPalForm.get('email').value
    }
    console.log(update);
    
    await this.fbstore.collection('perfiles').doc(this._user.userID).update(update).then(data => {
      this.loader.dismiss();
      this._toast.showToast('Cuenta Agregada', 3000);
      this.ngroute.navigateByUrl('/inicio')
    }).catch(error => {
      this.loader.dismiss();
      this._toast.showToast('Error al agregar','2000');
      this.ngroute.navigateByUrl('/inicio')
    })
  }

  async onClick() {
    this.loader = await this.loadingCtrl.create({
      message: this.translate.instant('ACOUNTLINK.LOADING'),
      mode: 'ios'
    })
    this.loader.present();
    this.http.post('https://us-central1-ejemplocrud-e7eb1.cloudfunctions.net/accountLink', {
      id: this._user.dataUser.csai
    }).subscribe( async (link: any) => {
      this.loader.dismiss();
      const alert = await this.alertCtrl.create({
        cssClass: 'my-custom-class',
        header: 'Acount Link',
        subHeader: this.translate.instant('ACOUNTLINK.ALERTSUBHEAD'),
        message: this.translate.instant('ACOUNTLINK.ALERTMESAGE'),
        mode: 'ios',
        buttons: [
          {
            text: 'Ok',
            handler: (blah) => {
              window.location.href = link.url;
            }
          }
        ]
      });
      await alert.present();
    })
  }

  retrieveAccount() {
    this.http.post('https://us-central1-ejemplocrud-e7eb1.cloudfunctions.net/retrieveAccount', {
      id: this._user.dataUser.csai
    }).subscribe( acount => {
      return acount
    })
  }

}
