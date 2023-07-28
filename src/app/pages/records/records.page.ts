import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastService } from '../../services/toast.service';
import { DataUsuarioService } from '../../services/data-usuario.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.page.html',
  styleUrls: ['./records.page.scss'],
})
export class RecordsPage implements OnInit {
  callList = [];
  hayLlamadas: boolean = false
  constructor(
    public ngroute: Router,
    private fbauth: AngularFireAuth,
    private fbstore: AngularFirestore,
    private toastservice: ToastService,
    public _user: DataUsuarioService,
  ) { }

  ngOnInit() {
    this.getCallsSpeaker();
  }


  async getCallsSpeaker() {
    try {
      this.fbstore.collection('calls', ref => ref.where('speId', '==', this._user.userID).where('CallStatus','==','completed')
                                                 .orderBy('create', 'desc')
      ).snapshotChanges().subscribe( data => {
        this.callList = data.map( result => {
          return {
            callId: result.payload.doc.id,
            impID: result.payload.doc.data()['inmpId'],
            create: result.payload.doc.data()['create'],
            minutos: result.payload.doc.data()['minutos'],
            CallStatus: result.payload.doc.data()['CallStatus']
          }
        })
        for(let index = 0; index < this.callList.length; index++) {
          this.fbstore.collection('perfiles').doc(this.callList[index]['impID']).snapshotChanges().subscribe(perfil => {
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
        // console.log(this.callList);
      })
    } catch (error) {
      
    }
  }

  

}
