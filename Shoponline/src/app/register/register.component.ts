import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username:string="";
  email="";
  password="";
  message="";
  errorMessage=""; // validation erroe handle
  error:{name:string,message:string}={name:"",message:""}; // for firebase erroe handle

  constructor(private authservice: AuthService, private router:Router) { }

  ngOnInit(): void {
  }
  
  register(){
    this.errorMessage="";
    this.error={name:"",message:""};
    if(this.validateForm(this.username,this.email,this.password))
    {
      this.authservice.registerWithEmail(this.username, this.email, this.password).then(()=>{
        this.message="You are successfully registered";
      //  this.router.navigate(['/home'])
      }).catch((_error: { name: string; message: string; }) => {
        this.error=_error;
        this.router.navigate(['/register']);
      })
    }
  }
  validateForm(username: string | any[],email: string | any[],password: string | any[]){
    if(username.length === 0){
      this.errorMessage="please enter username";
    }
   if(email.length === 0){
     this.errorMessage="please enter email id";
     return false;
   }
   if(password.length === 0){
     this.errorMessage="please enter password";
   }
   if(password.length<6){
     this.errorMessage="password should be atleast 6 character";
   }

   this.errorMessage="";
   return true

  }

}
