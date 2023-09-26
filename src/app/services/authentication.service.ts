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
      
    }).catch((error) => {
      window.alert(error)
    })
  }

 

  // Sign-out 
  SignOut() {
    return this.ngFireAuth.signOut().then(() => {
      
      this.router.navigate(['/login']);
    })
  }

  getUserPerfil(uid: string) {
    try{
      this.afStore.doc('perfiles/'+uid).valueChanges().subscribe(  result => {
        
        
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


