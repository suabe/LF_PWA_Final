import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CallsService {
  
  constructor(
    public afStrore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    private http: HttpClient
  ) { }


  detalle( id:string ) {
    return this.afStrore.collection('calls').doc(id).snapshotChanges()
  }

  complemento(uri:string) {
    var url = 'https://api.twilio.com/2010-04-01/Accounts/ACf88cd2fcc4ec6d7c79baaaf73bdf4c71/Calls/'+uri+'.json';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa('ACf88cd2fcc4ec6d7c79baaaf73bdf4c71:9506c5f81cc1228b90e8925a9033c2cc')
      })
    }
    return this.http.get(url,httpOptions);
  }

  childCall(uri:string) {
    var url = 'https://api.twilio.com/2010-04-01/Accounts/ACf88cd2fcc4ec6d7c79baaaf73bdf4c71/Calls.json?ParentCallSid='+uri;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa('ACf88cd2fcc4ec6d7c79baaaf73bdf4c71:9506c5f81cc1228b90e8925a9033c2cc')
      })
    }
    return this.http.get(url,httpOptions);
  }

  recordings(uri:string){
    var url = 'https://api.twilio.com/2010-04-01/Accounts/ACf88cd2fcc4ec6d7c79baaaf73bdf4c71/Calls/'+uri+'/Recordings.json';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa('ACf88cd2fcc4ec6d7c79baaaf73bdf4c71:9506c5f81cc1228b90e8925a9033c2cc')
      })
    }
    return this.http.get(url,httpOptions);
  }


}
