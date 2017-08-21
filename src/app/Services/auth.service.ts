import { Injectable } from '@angular/core'
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Router } from '@angular/router'
import { AppConfig } from '../app.config'

@Injectable()
export class AuthService {

  constructor(private router : Router, private http : Http) { }

  sessionActive : boolean = false
  TOKEN_KEY = 'token'

  login(username : string, password : string){
    let body = new FormData()
    body.append('username', username)
    body.append('password', password)
      this.http.post(AppConfig.api + '/users/verify/login', body).subscribe( res => {
        let resdata = res.json()
        if(resdata.err){
          return false
        }else{
          localStorage.setItem(this.TOKEN_KEY, resdata.data.token)
          //console.log('token decoded', atob(resdata.data.token))
          this.router.navigate(['Admin/Dashboard'])
        }
      })
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['Admin-Login'])
  }

  getUserRole(){
     let token = atob(localStorage.getItem(this.TOKEN_KEY))
     let tokenO = JSON.parse(token)
     return tokenO.role
  }

  isUserAuthenticated() : boolean{
    return !!localStorage.getItem(this.TOKEN_KEY)
  }
}
