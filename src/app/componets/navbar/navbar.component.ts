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
  isDarkTheme = false;

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

    // LocalStorge Dark theme when ng init() loading
    this.isDarkTheme = localStorage.getItem('theme') === 'dark' ? true : false;

}

// Dark theme 
    toggleTheme(){
      this.isDarkTheme = !this.isDarkTheme;
      localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
    }

//  Logout method
  public logout(){
    console.log('logout click');
    this.loginService.logOut();
    window.location.reload();
    // this.loginService.loginStatusSubject.next(false);
  }


}
