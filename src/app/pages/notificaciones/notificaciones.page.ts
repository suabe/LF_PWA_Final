import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataUsuarioService } from '../../services/data-usuario.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {
  notifications: any;
  hayNotificaciones: boolean =false
  color = 'azul'
  constructor(
    private afstore: AngularFirestore,
    private _user: DataUsuarioService
  ) { }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    if (this._user.dataUser.role === 'cliente') {
      this.color = 'naranja'
    }
    this.getNotifications()
    console.log(new Date(this._user.dataUser.creado));
    
  }

  async getNotifications() {
    let hoy = new Date(this._user.dataUser.creado)
      let day = hoy.getDate()
      let month = hoy.getMonth() + 1
      let year = hoy.getFullYear()
      console.log('fecha', year+'-'+month+'-'+day);
    if (this._user.dataUser.role === 'cliente') {
      const grupo = 'imp';
      await this.afstore.collection('notifications', ref => ref.where('grupo','in',[grupo,'all']).where('created','>=',this._user.dataUser.creado).orderBy('created','desc')).snapshotChanges()
      .subscribe( data => {
        this.notifications = data.map( result => {
          return {
            nid: result.payload.doc.id,
            title: result.payload.doc.data()['title'],
            message: result.payload.doc.data()['message'],
            created: result.payload.doc.data()['created']
          }
        })
        if (this.notifications.length > 0) {
          this.hayNotificaciones = true
        }
        console.log(this.notifications);
        
      })
    } if (this._user.dataUser.role === 'conversador') {
      const grupo = 'spe';
      await this.afstore.collection('notifications', ref => ref.where('grupo','in',[grupo,'all']).where('created','>=',this._user.dataUser.creado).orderBy('created','desc')).snapshotChanges()
      .subscribe( data => {
        this.notifications = data.map( result => {
          return {
            nid: result.payload.doc.id,
            title: result.payload.doc.data()['title'],
            message: result.payload.doc.data()['message'],
            created: result.payload.doc.data()['created']
          }
        })
        if (this.notifications.length > 0) {
          this.hayNotificaciones = true
        }
      })
    }

    
    
    
    
  }

}
