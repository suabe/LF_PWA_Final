import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../interfaces/interfaces';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataUsuarioService {

  dataUser:  User = {};
  cargo: false;
  userID = '';
  isAuthenticated: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(null);
  isLogin: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(null);
  emailVerified: false;
  lfID
  constructor(
    public afStrore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    private http: HttpClient
  ) { 
    //console.log('Data User  Listo');
    this.ngFireAuth.authState.subscribe((user: any) => {
      if (user) {
        //console.log('Servicio ',user);
      try {
        this.afStrore.doc('perfiles/'+user.uid).valueChanges().subscribe( result => {
          this.dataUser = result;
          this.userID = user.uid;
          this.isAuthenticated.next(true);
          this.isLogin.next(true);
          this.emailVerified = user.emailVerified;
          // console.log(this.emailVerified);
        })
      } catch (error) {
        console.log(error.message);
        this.isAuthenticated.next(false);
      }
      } else {
        //console.log('no hau usuario');
        this.isAuthenticated.next(false);
      }
      
    })
    
    
    
    
  }

  checkLfIdExists(value: string) {
  //console.log(value);
   this.afStrore.collection('perfiles', ref => ref.where('LFId','==', value).limit(1)).snapshotChanges().subscribe(user => {
    this.lfID = user.map((result) => {return result.payload.doc.data()['LFId']})
     
    })
    console.log('Buscado: '+this.lfID+' Valor:'+value);
    return of(this.lfID === value).pipe(delay(1000))
  }

  buscaLFId( value: string){
    return this.afStrore.collection('perfiles', ref => ref.where('LFId','==', value).limit(1)).snapshotChanges()
  }

  createAccount() {
    this.http.post('https://us-central1-ejemplocrud-e7eb1.cloudfunctions.net/createAccount', {
      country: this.dataUser.country,
      email: this.dataUser.email
    })
  }

}
