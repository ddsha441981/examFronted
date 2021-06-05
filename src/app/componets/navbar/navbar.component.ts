import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  user = null;

//  constructor
  constructor(public loginService: LoginService){
  }


  ngOnInit(): void {

    this.isLoggedIn = this.loginService.isLoggedIn();
    this.user = this.loginService.getUser();
    this.loginService.loginStatusSubject.asObservable().subscribe(data => {

      this.isLoggedIn = this.loginService.isLoggedIn();
      this.user = this.loginService.getUser();

    });

  }

//  Logout method
  public logout(){
    console.log('logout click');
    this.loginService.logOut();
    window.location.reload();
    // this.loginService.loginStatusSubject.next(false);
  }


}
