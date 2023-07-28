import { Component, OnInit } from '@angular/core';
import { DataUsuarioService } from '../../services/data-usuario.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-perfil-delete',
  templateUrl: './perfil-delete.page.html',
  styleUrls: ['./perfil-delete.page.scss'],
})
export class PerfilDeletePage implements OnInit {
  color = 'azul';
  userPerfil
  loader
  deleteForm = new FormGroup({
    password: new FormControl ('', [Validators.required]),
    motivo: new FormControl ('', [Validators.required]),
    referidos: new FormControl ('', [Validators.required]),
    minutos: new FormControl ('', [Validators.required])
  })
  constructor(
    public _user: DataUsuarioService,
    public addnewFormbuilder: FormBuilder,
    private alertCtrl: AlertController,
    private loading: LoadingController,
    private auth: AngularFireAuth,
    private fbstore: AngularFirestore,
    private router: Router,
    private http: HttpClient,
    private translate: TranslateService
  ) { }

  get f(){
    return this.deleteForm.controls;
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (this._user.dataUser.role === 'cliente') {
      this.color = 'naranja'
    }
    this.userPerfil = this._user.dataUser 
  }

  ionViewWillLeave() {
    this.deleteForm.reset()
  }

  async delete() {
    let data = this.deleteForm.value
    console.log('formulari =>', data);
    
    let cUser = (await this.auth.currentUser).email
    this.loader = await this.loading.create({
      message: 'Procesando...',
      mode: 'ios',
      spinner: 'bubbles'
    })
    this.loader.present();
    const credentials = this.auth.signInWithEmailAndPassword(cUser,this.deleteForm.get('password').value)
    credentials.then(
      async success => {
        let salida = {
          motivo: this.deleteForm.get('motivo').value,
          referidos: this.deleteForm.get('referidos').value,
          minutos: this.deleteForm.get('minutos').value
        }
        this.fbstore.collection('perfiles').doc(this._user.userID).update({status: 'canceled'}).then(
          success => {
            this.http.post('https://us-central1-ejemplocrud-e7eb1.cloudfunctions.net/sendAcountStatus',{
              userType: (this._user.dataUser.role == 'cliente')? 'improvers':'speakers',
              action: 'cancelar',
              notas: 'Cuenta cancelada por el usuario',
              name: this._user.dataUser.name+' '+this._user.dataUser.lastName,
              email: this._user.dataUser.email
            }).subscribe(data => {
              console.log(data);
              
            })
          }, error => {
            console.log('error al guarda');
            
          }
        )
        this.fbstore.collection('stausHistory').add({salida,adminID: this._user.userID,status: 'canceled',uid: this._user.userID,date: new Date().toLocaleString()})
        this.loader.dismiss();
        const  alert = await this.alertCtrl.create({
          header: this.translate.instant('CANCELCOUNT.ALERTHEADER'),
          subHeader: this.translate.instant('CANCELCOUNT.ALERTSUNHEADER'),
          message: this.translate.instant('CANCELCOUNT.ALERTMESAGE'),
          mode: 'ios',
          buttons: [        
            {
              text: 'Ok',
              handler: (blah) => {
                this.auth.signOut().then(() => {
                  localStorage.removeItem('user');
                  localStorage.removeItem('perfil');
                  this.router.navigate(['/login']);
                })
              }
            }
          ]
        });
        await alert.present();
      }, async error => {
        let alert = await this.alertCtrl.create({
          cssClass: 'my-custom-class',
          header: this.translate.instant('CANCELCOUNT.ALERTHEADER'),
          message: this.translate.instant('CANCELCOUNT.ALERTMESAGEERROR'),
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
  }

}
