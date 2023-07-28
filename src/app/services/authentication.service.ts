import { Injectable, NgZone } from '@angular/core';
//import { auth } from 'firebase/app';
import { User } from "../interfaces/interfaces";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ToastService } from './toast.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userData: any;
  ngFireAuthState: any;

  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,  
    public ngZone: NgZone,
    private toastservice: ToastService
  ) {
    // this.ngFireAuth.authState.subscribe((user: any) => {
    //   if (user) {
    //     this.userData = user;
    //     localStorage.setItem('user', JSON.stringify(this.userData));
    //     //JSON.parse(localStorage.getItem('user'));
    //   } else {
    //     localStorage.setItem('user', null);
    //     //JSON.parse(localStorage.getItem('user'));
    //   }
    // })
  }

  // Login in with email/password
  SignIn(email, password) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password)
  }

  // Register user with email/password
  RegisterUser(email, password) {
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password)
  }

  // Email verification when new user register
  async SendVerificationMail() {
    return (await this.ngFireAuth.currentUser).sendEmailVerification()
    .then(() => {
      //this.router.navigate(['verify-email']);
    })
  }

  // Recover password
  PasswordRecover(passwordResetEmail) {
    return this.ngFireAuth.sendPasswordResetEmail(passwordResetEmail)
  }

  // Returns true when user is looged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Returns true when user's email is verified
  get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user.emailVerified !== false) ? true : false;
  }

  // Sign in with Gmail
  GoogleAuth() {
    //return thisLogin(new auth.GoogleAuthProvider());
  }

  // Auth providers
  AuthLogin(provider) {
    return this.ngFireAuth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        })
      //this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error)
    })
  }

  // Store user in localStorage
  /*SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
    const userData: User = {
      //uid: user.uid,
      email: user.email,
      //displayName: user.displayName,
      //fristName: user.fristName,
      lastName: user.lastName,
      gender: user.gender,
      birthDate: user.birthDate,
      phone: user.phone,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }*/

  // Sign-out 
  SignOut() {
    return this.ngFireAuth.signOut().then(() => {
      //localStorage.removeItem('user');
      //localStorage.removeItem('perfil');
      this.router.navigate(['/login']);
    })
  }

  getUserPerfil(uid: string) {
    try{
      this.afStore.doc('perfiles/'+uid).valueChanges().subscribe(  result => {
        //console.log('perfil', uid);
        
        const userData: User ={
          birthDate: result['birthDtate'],
          email: result['email'],
          gender: result['gender'],
          lastName: result['lastName'],
          name: result['name'],
          phone: result['phone'],
          role: result['role'],
          status: result['status'],
          emailVerified: true
        }
        localStorage.setItem('perfil', JSON.stringify(userData));
        
        return true
        
      })
    }catch(error) {
      this.toastservice.showToast(error.message, 2000);
    }
  }

}
function thisLogin(arg0: any) {
  throw new Error('Function not implemented.');
}

