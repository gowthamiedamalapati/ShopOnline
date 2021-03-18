import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  username:string="";
  email="";
  password="";
  errorMessage=""; // validation erroe handle
  error:{name:string,message:string}={name:"",message:""}; // for firebase erroe handle

  constructor(private authservice: AuthService, private router:Router) { }

  ngOnInit(): void {
  }
  
  login(){
    this.errorMessage="";
    this.error={name:"",message:""};
    if(this.validateForm(this.email,this.password))
    {
      this.authservice.loginWithEmail(this.email, this.password).then(()=>{
        alert("successful");
      //  this.router.navigate(['/home'])
      }).catch((_error: { name: string; message: string; }) => {
        this.error=_error;
        this.router.navigate(['/login']);
      })
    }
  }
  validateForm(email: string,password: string){
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
