import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/auth';
import { User } from 'src/app/services/shared/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User | undefined
  authState:any=null;

  constructor(private angularfireauth:AngularFireAuth, private router:Router) { 
    this.angularfireauth.authState.subscribe((auth)=>{
      this.authState=auth;
    })
  }

  registerWithEmail(username: string, email: string, password: string){
    return this.angularfireauth.createUserWithEmailAndPassword(email,password).then((user)=>{
      console.log(user);
      this.authState=user;
    }).catch(error=>{
      console.log(error);
      throw error
    })
  }
  loginWithEmail(email:string,password:string){
    return this.angularfireauth.signInWithEmailAndPassword(email,password).then((user)=>{
      console.log(user);
      this.authState=user;
    }).catch(error =>{
     console.log(error);
     throw error
    });
  }
  async loginWithGoogle(){
    await this.angularfireauth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((res)=>{
      this.router.navigate(['/products']);
     console.log("successful");
    }).catch(error=>{
      console.log("Error while signin",error);
    })
  }
  loginWithFacebook(){
     this.angularfireauth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then((res)=>{
     this.router.navigate(['/products']);
     console.log("logged in using facebook");
    }).catch(error=>{
      console.log("Error while signin",error);
    })
  }
  signOut():void{
    this.angularfireauth.signOut();
    this.router.navigate(["/home"]);
  }
}
