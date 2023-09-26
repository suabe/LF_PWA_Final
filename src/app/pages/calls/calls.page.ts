import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastService } from '../../services/toast.service';
import { ModalController } from '@ionic/angular';
import { CalificaLlamadaPage } from '../califica-llamada/califica-llamada.page';

@Component({
  selector: 'app-calls',
  templateUrl: './calls.page.html',
  styleUrls: ['./calls.page.scss'],
})
export class CallsPage implements OnInit {
  userList = [];

  constructor(
    private fbstore: AngularFirestore,
    public toastservice: ToastService,
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getPlans();
  }

  async getPlans() {
    try {
      this.fbstore.collection('plans', ref => ref.where('active', '==', true)
                                                  .where('enllamada', '==', false)).snapshotChanges()
      .subscribe( data => {
        this.userList = data.map( result => {
          return {
            planID: result.payload.doc.id,
            iUid: result.payload.doc.data()['uid'],
          }            
        })
        for (let index = 0; index < this.userList.length; index++) {
          this.fbstore.collection('perfiles').doc(this.userList[index]['iUid']).snapshotChanges().subscribe(perfil => {
            this.userList[index]['name'] = perfil.payload.data()['name'];
            this.userList[index]['lastName'] = perfil.payload.data()['lastName'];
            this.userList[index]['foto'] = perfil.payload.data()['foto'];
            this.userList[index]['imTel'] = perfil.payload.data()['code'];
            this.userList[index]['bio'] = perfil.payload.data()['bio'];
            this.userList[index]['creado'] = perfil.payload.data()['creado'];
            this.userList[index]['gender'] = perfil.payload.data()['gender'];
            this.userList[index]['country'] = perfil.payload.data()['country'];
          })
          
        }        
      });
      
    } catch (error) {
      this.toastservice.showToast(error.message, 2000)
    }
}

llamarCliente(user) {
  this.toastservice.showToast('Llamando...',5000)
  setTimeout(async () => {
    const modal = await this.modalCtrl.create({
      component: CalificaLlamadaPage,
      componentProps: user
    });
    await modal.present();
  }, 2000);  
  
}

}
