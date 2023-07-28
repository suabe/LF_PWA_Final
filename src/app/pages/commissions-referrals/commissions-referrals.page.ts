import { Component, OnInit } from '@angular/core';
import { DataUsuarioService } from '../../services/data-usuario.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../../interfaces/interfaces';

@Component({
  selector: 'app-commissions-referrals',
  templateUrl: './commissions-referrals.page.html',
  styleUrls: ['./commissions-referrals.page.scss'],
})
export class CommissionsReferralsPage implements OnInit {
  color = 'azul'
  referals
  comissions
  hayComision: boolean = false
  hayReferal: boolean = false
  comisionTotal = 0
  constructor(
    public _user: DataUsuarioService,
    private afstore: AngularFirestore
  ) { }

  ngOnInit() {
    this.getComissions()
  }

  ionViewWillEnter() {
    if (this._user.dataUser.role === 'cliente') {
      this.color = 'naranja'
    }

    this.getReferals()
    
  }

  async getReferals() {
    await this.afstore.collection('plans', ref => ref.where('idref', '==', this._user.dataUser.LFId )).snapshotChanges()
    .subscribe(data => {
      this.referals = data.map( result => {
        return { 
          uid: result.payload.doc.data()['uid'],
          idPlan: result.payload.doc.id,
          language: result.payload.doc.data()['idioma'],
          tipo: result.payload.doc.data()['price'],
          status: result.payload.doc.data()['status'],
          LFId: result.payload.doc.data()['idref']
        }
      } )
      for (let index = 0; index < this.referals.length; index++) {
        this.afstore.collection('perfiles').doc(this.referals[index]['uid']).snapshotChanges().subscribe( user => {
          this.referals[index]['user'] = user.payload.data()
        })
        this.afstore.collection('prieces', ref => ref.where('price','==',this.referals[index]['price'])).snapshotChanges().subscribe(pri => {
          pri.map( result => {
            this.referals[index]['type'] = result.payload.doc.data()['type']
          })
          
        })
        this.referals[index];
        
      }
      if (this.referals.length > 0) {
        this.hayReferal = true
      }
      //console.log(this.referals);
      
    })
  }

  async getComissions() {
    await this.afstore.collection('pagosComisiones', ref => ref.where('uid','==',this._user.userID)).snapshotChanges()
    .subscribe(data => {
      this.comissions = data.map(result => {
        return {
          idTrans: result.payload.doc.data()['transaccion']['id'],
          amount: result.payload.doc.data()['amount_paid'],
          comision: result.payload.doc.data()['comision'],
          created: result.payload.doc.data()['creado']
        }        
      })
      this.comissions.forEach(element => {
        this.comisionTotal += element.comision
      });
      if (this.comissions.length > 0) {
        this.hayComision = true
      }
      //console.log(this.comisionTotal);
      
    })
  }

}
