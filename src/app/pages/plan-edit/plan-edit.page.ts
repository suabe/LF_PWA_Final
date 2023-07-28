import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController, LoadingController } from '@ionic/angular';
import { DataUsuarioService } from '../../services/data-usuario.service';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../../services/toast.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-plan-edit',
  templateUrl: './plan-edit.page.html',
  styleUrls: ['./plan-edit.page.scss'],
})
export class PlanEditPage implements OnInit {
  @Input() plan;
  @Input() customer;
  @Input() schedule;
  loading
  wallet
  planData
  editaPlanForm = new FormGroup({
    schedule: new FormControl(null,[Validators.required])
  })
  constructor(
    private afStore: AngularFirestore,
    private modalCtrl: ModalController,
    public _user: DataUsuarioService,
    private http: HttpClient,
    public _toast: ToastService,
    public loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.getPlan();
    //this.getWallet();
    
  }

  ionViewWillEnter() {    
    this.getPlan();
    //this.getWallet();
    
  }

  async getPlan() {
    await this.afStore.collection('plans').doc(this.plan).snapshotChanges()
    .subscribe( datta => {
      this.planData = datta.payload.data()
      this.planData['type'] = datta.payload.data()['price']
      this.editaPlanForm.get('schedule').setValue(this.schedule);      
    })
  }

  async getWallet() {
    await this.afStore.collection('wallet', ref => ref.where('uid', '==', this._user.userID )).snapshotChanges()
    .subscribe( data => {
      this.wallet = data.map( result => {
        return result.payload.doc.data()
      })
      this.editaPlanForm.get('tarjeta').setValue(this.customer);
      this.editaPlanForm.get('schedule').setValue(this.schedule);
    } )
  }

  cancelar() {
    this.modalCtrl.dismiss();
  }

  async editarPlan() {
    this.presentLoading('...Procesando');
    console.log(this.editaPlanForm.get('schedule').value);
    let planActual = {
      schedule: this.editaPlanForm.get('schedule').value
    }
    this.afStore.collection('plans').doc(this.plan).update(planActual).then(plan => {

      this.loading.dismiss()
      this.modalCtrl.dismiss();    
    })
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
