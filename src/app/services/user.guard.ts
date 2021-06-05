import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {


  //constructor
  constructor(private loginService: LoginService, private router: Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      if (this.loginService.isLoggedIn() && this.loginService.getUserRole() == "NORMAL"){
        ////redirect Normal User page
        return true;
      }//Otherwise again  navigate to login page
        this.router.navigate(['login']);
        
      return false;
  }
  
}
