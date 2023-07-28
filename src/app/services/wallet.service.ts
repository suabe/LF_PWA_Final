import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class WalletService {

  uid = ''
  wallet:any = ''

  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    private http: HttpClient
  ) { 
    this.ngFireAuth.authState.subscribe((user: any ) => {
      this.uid = user.uid
    })
  }

  async getWallet() {
    await this.afStore.collection('wallet', ref => ref.where('uid', '==', this.uid )).snapshotChanges()
    .subscribe( data => {
      this.wallet = data.map( result => {
        return result.payload.doc.data()
      })
    } )
  }
}
