import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService:UserService) { }

  // User Binding Object
  public user={
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:'',

  };

  ngOnInit(): void {
  }

  // Form Submit
  formSubmit(){
    console.log(this.user)
    if(this.user.username == '' || this.user.username == null){
      alert("Username Required!!")
      return;
    }
    // AddUser Method Calling From UserServices
    this.userService.addUser(this.user).subscribe(
      (data)=>{
        //Success
        console.log(data)
        alert("Success")
      },
      (error)=>{
        //Error
        console.log(error)
        alert("Something went to wrong!!!")
      }
    )

  }

}
