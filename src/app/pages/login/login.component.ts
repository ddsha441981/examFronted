import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(private snackBar : MatSnackBar ,private loginService: LoginService, private router: Router) { }

    // Login Object
  loginData = {
    username: '',
    password: '',
  };

  ngOnInit(): void {
  }

  // Login form Submit method
  loginFormSubmit(){
    console.log("Login Button Clicked");
    console.log(this.loginData);

    //Validations of login form
    //For Username
    if (this.loginData.username.trim() == '' || this.loginData.username == null){
      // alert("Username required");
      // MatSnackBar
      this.snackBar.open("Username is required!!!","OK",{
        duration:3000,
      });
      return;
    }

    //For Password
    if (this.loginData.password.trim() == '' || this.loginData.password == null){
      // alert("Password required");
      this.snackBar.open("Password is required!!!","ok",{
        duration:3000,
      });
      return;
    }

    // Request to server to generate JWT Token
      this.loginService.generateToken(this.loginData).subscribe(
        (data:any)=>{
          //Success
          console.log(data);
          // alert("Succeessfully Token genrated!!!");

          //After Successfully generated token then login from here!!!
          this.loginService.loginUser(data.token);

          //getting current user
          this.loginService.getCurrentUser().subscribe(
            (user:any)=>{

              //save user data into localStorage
              this.loginService.setUser(user);
              console.log(user);

              //redirect: ...ADMIN: Admin-Dashboard
              if (this.loginService.getUserRole() == "ADMIN"){
                //reDirect Admin DashBoard
                // window.location.href="/admin";
                this.router.navigate(['admin']);
                this.loginService.loginStatusSubject.next(true);


                //redirect: ...NORMAL: Normal-Dashboard
              }else if (this.loginService.getUserRole() == "NORMAL"){
                  //reDirect User DashBoard
                  // window.location.href="/user-dashboard";
                  this.router.navigate(['user-dashboard']);
                  this.loginService.loginStatusSubject.next(true);

              }
              else{
                this.loginService.logOut();
              }



            },
          )

        },
        (error)=>{
          //Error Occured
          console.log("Oops...","Seems like Something went wrong!!!",error);
          this.snackBar.open("Invaild credentials!!! Try Agin","ok",{
            duration: 3000,
          });
        }
      );


  }

}
