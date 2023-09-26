import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { ToastService } from '../../services/toast.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  recuperaForm = new FormGroup({
    email: new FormControl( '',[Validators.required,Validators.email])
  });

  constructor(
    private athService: AuthenticationService,
    private toastService: ToastService,
    private router: NavController,
    public alertCtrl: AlertController
  ) { }

  ngOnInit() {
  }

  recuperar() {
    this.athService.PasswordRecover(this.recuperaForm.get('email').value).then( data => {
      this.alerta();
    }).catch((error) => {
      this.toastService.showToast(error.message,3000);
      
      
    });
  }

  async alerta() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Recover password',
      message: 'You have started the process to recover your password, an email has been sent to you with the instructions to follow.',
      mode: 'ios',
      buttons: [
        {
          text: 'Ok',
          handler: (blah) => {
            
            this.router.navigateRoot('login',{animated: true});
          }
        }
      ]
    });

    await alert.present();
  }

}
