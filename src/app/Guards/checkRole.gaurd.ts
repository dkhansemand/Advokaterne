import { Injectable } from '@angular/core'
import { CanActivate,
         ActivatedRouteSnapshot,
         RouterStateSnapshot,
         Router} from '@angular/router'

import { AuthService } from '../Services/auth.service'

@Injectable()
export class CheckRoleRouteGuard implements CanActivate {

  constructor(private auth: AuthService, private router : Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if(this.auth.isUserAuthenticated() && this.auth.getUserRole() >= 80 ){
          return true
      }else{
          this.router.navigate(['Admin/Dashboard'])
          return false
      }
  }
}