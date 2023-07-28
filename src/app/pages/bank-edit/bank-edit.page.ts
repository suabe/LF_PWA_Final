import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { DataUsuarioService } from '../../services/data-usuario.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-bank-edit',
  templateUrl: './bank-edit.page.html',
  styleUrls: ['./bank-edit.page.scss'],
})
export class BankEditPage implements OnInit {
  userPerfil
  loading
  color = 'azul';
  editaBankForm = new FormGroup({
    spei: new FormControl('',Validators.required),
  })
  constructor(
    private _user: DataUsuarioService,
    private modalCtrl: ModalController,
    private afStore: AngularFirestore,
    public loadingCtrl: LoadingController,
    public toastservice: ToastService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (this._user.dataUser.role === 'cliente') {
      this.color = 'naranja'
    }
    this.userPerfil = this._user.dataUser;
    if (this._user.dataUser.spei) {
      
      this.editaBankForm.setValue({
        spei: this._user.dataUser.spei
      })
    }

    console.log(this._user.dataUser);
  }


  async editarBank() {
    this.presentLoading('...Guardando');
    const dataEdit = this.editaBankForm.value
    try {
      await this.afStore.collection('perfiles').doc(this._user.userID).update(dataEdit).then( data =>{
        this.loading.dismiss();
        this.modalCtrl.dismiss();
      })
      
    } catch (error) {
      this.modalCtrl.dismiss();
      this.toastservice.showToast(error,5000);
    }
    
  }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }

  async presentLoading( message: string ) {
    this.loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      mode: 'ios',
      message
    });
    this.loading.present();
  }

}
