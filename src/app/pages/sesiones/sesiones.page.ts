import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CalificaLlamadaPage } from '../califica-llamada/califica-llamada.page';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastService } from 'src/app/services/toast.service';
import { DataUsuarioService } from 'src/app/services/data-usuario.service';

@Component({
  selector: 'app-sesiones',
  templateUrl: './sesiones.page.html',
  styleUrls: ['./sesiones.page.scss'],
})
export class SesionesPage implements OnInit {
  callList = [];
  hayLlamadas: boolean = false
  constructor(
    private modalCtrl: ModalController,
    private fbauth: AngularFireAuth,
    private fbstore: AngularFirestore,
    private toastservice: ToastService,
    public _user: DataUsuarioService,
  ) { }

  ngOnInit() {
    this.getCallsImprover()
  }

  async getCallsImprover() {
    try {
      this.fbstore.collection('calls', ref => ref.where('inmpId', '==', this._user.userID)
                                                 .orderBy('createdTime', 'desc')
      ).snapshotChanges().subscribe( data => {
        this.callList = data.map( result => {
          return {
            callId: result.payload.doc.id,
            speId: result.payload.doc.data()['speId'],
            create: result.payload.doc.data()['create'],
            minutos: result.payload.doc.data()['minutos'],
            CallStatus: result.payload.doc.data()['CallStatus']
          }
        })
        for(let index = 0; index < this.callList.length; index++) {
          this.fbstore.collection('perfiles').doc(this.callList[index]['speId']).snapshotChanges().subscribe(perfil => {
            this.callList[index]['name'] = perfil.payload.data()['name'];
            this.callList[index]['lastName'] = perfil.payload.data()['lastName'];
            this.callList[index]['foto'] = perfil.payload.data()['foto'];
            this.callList[index]['imTel'] = perfil.payload.data()['code'];
            this.callList[index]['bio'] = perfil.payload.data()['bio']
          })
        }
        if (this.callList.length > 0) {
          this.hayLlamadas = true
        }
        console.log(this.callList);
      })
    } catch (error) {
      
    }
  }

  async calificaCliente(userId) {
    const modal = await this.modalCtrl.create({
      component: CalificaLlamadaPage
    });
    await modal.present();
    console.log(userId);
    

  }

}
