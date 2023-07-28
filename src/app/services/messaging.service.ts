import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { tap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataUsuarioService } from './data-usuario.service';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  token = null;
  constructor(
    private afmessagin: AngularFireMessaging,
    private afStrore: AngularFirestore,
    private _user: DataUsuarioService
  ) { }

  requestPermission() {
    return this.afmessagin.requestToken.pipe(
       tap(async token => {
        let tokenId = {
          mtoken: token
        }
        
        console.log('Store token to server: ', token);
        try {
          await this.afStrore.doc('perfiles/'+this._user.userID).update(tokenId).then(data => {
            // console.log(data);
            //window.location.reload();
          })
        } catch (error) {
          console.log(error.message);
          
        }
      })
    );
  }

  getMessages() {
    return this.afmessagin.messages;
  }
 
  deleteToken() {
    if (this.token) {
      this.afmessagin.deleteToken(this.token);
      this.token = null;
    }
  }
}
