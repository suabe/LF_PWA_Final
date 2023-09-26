import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastService } from '../../services/toast.service';
import { MenuController, LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import ErrorFirebase  from './login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginform = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  splitPaneState
  loader: any;
  constructor(
    public authService: AuthenticationService,
    public navCtrl: Router,
    public loginFormbuilder: FormBuilder,
    public toastservice: ToastService,
    public menu: MenuController,
    private loadingCtrl: LoadingController,
    private alert: AlertController,
    private afstore: AngularFirestore
  ) { 
    
  }
  
  ngOnInit() {
    this.menu.enable(false,'primerMenu');
  }

  ngOnDestroy() {
    this.menu.enable(true,'main');
  }

  ionViewWillEnter() {
    this.menu.enable(false,'main');
    this.splitPaneState = false;
  }

  async doLogin() {
    
    this.loader = await this.loadingCtrl.create({
      message: 'Procesando...',
      mode: 'ios'
    })
    
    
    this.loader.present();
    this.authService.SignIn(this.loginform.get('email').value,this.loginform.get('password').value).then( data => {
      this.afstore.collection('perfiles').doc(data.user.uid).get().subscribe( async user =>  {
        
        if (user.data()['status'] == 'canceled') {
          this.loadingCtrl.dismiss();
          this.authService.SignOut();
          const alerta = this.alert.create({
            mode: 'ios',
            header: 'Error',
            subHeader: 'No se pudo inciar sesiòn.',
            message: 'Tu cuenta esta cancelada, para aclaraciones comunicate con soporte.',
            buttons: [          
              {
                text: 'Ok',
                handler: (blah) => {
                  
                }
              }
            ]
          });
          await (await alerta).present()
        } else if (user.data()['status'] == 'suspended') {
          this.loadingCtrl.dismiss();
          this.authService.SignOut();
          const alerta = this.alert.create({
            mode: 'ios',
            header: 'Error',
            subHeader: 'No se pudo inciar sesiòn.',
            message: 'Tu cuenta esta suspendida, para aclaraciones comunicate con soporte.',
            buttons: [          
              {
                text: 'Ok',
                handler: (blah) => {
                  
                }
              }
            ]
          });
          await (await alerta).present()
        } else {
          
          setTimeout(() => {
            this.loadingCtrl.dismiss();
            return this.navCtrl.navigate(['/inicio']).then(nav => {
              
              
              if (nav == false) {
                this.navCtrl.navigate(['/inicio'])
              }
              
            })
            
          }, 1500);
        }
        
      })
      
    }).catch(async (error) => {
      this.loadingCtrl.dismiss();
      let erorTans = this.getError(error.code);
      const alerta = this.alert.create({
        mode: 'ios',
        header: 'Error',
        subHeader: 'No se pudo inciar sessiòn.',
        message: erorTans,
        buttons: [          
          {
            text: 'Ok',
            handler: (blah) => {
              
            }
          }
        ]
      });
      await (await alerta).present()
      
      
    });
    
  }

  getError(code) {
    
    return ErrorFirebase[code]
    
  }

  private redirectUser(isVerified: boolean): void {
    if (isVerified) {
      this.navCtrl.navigate(['/inicio']);
    } else {
      this.toastservice.showToast('Email no verificado, por favor revisa tu buzon',4000)
    }
  }

}
