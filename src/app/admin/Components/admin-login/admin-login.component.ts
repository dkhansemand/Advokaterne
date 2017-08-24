import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../Services/auth.service'

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private auth : AuthService) { }

  loginData = {
      email: '',
      password: ''
  }
  loginError : boolean = false
  loginEmpty : boolean = false

  ngOnInit() {
  }

  validEmail(email){
      let regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return regEx.test(email)
  }

  login(){
    if(this.loginData.email !== '' && this.loginData.password !== ''){
      if(!this.auth.login(this.loginData.email, this.loginData.password)){
        this.loginError = true
      }else{
        this.loginError = false
      }
    }else{
      this.loginError = true
      this.loginEmpty = true
    }
  }

}
