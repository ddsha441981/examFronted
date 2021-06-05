import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService, private snack: MatSnackBar) { }

  // User Binding Object
  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',

  };

  ngOnInit(): void {
  }

  // Form Submit
  formSubmit() {
    console.log(this.user)

    // Validations

    if (this.user.username == '' || this.user.username == null) {
      // alert("Username Required!!")
      this.snack.open("Username is required!!", 'ok', {
        duration: 3000,
        // verticalPosition:'top'
      });
      return;
    }

    if (this.user.password == '' || this.user.password == null) {
      this.snack.open("password is required!!", 'ok', {
        duration: 3000,
      });
      return;
    }

    if (this.user.firstName == '' || this.user.firstName == null) {
      this.snack.open("firstName is required!!", 'ok', {
        duration: 3000,
      });
      return;
    }

    if (this.user.lastName == '' || this.user.lastName == null) {
      this.snack.open("lastName is required!!", 'ok', {
        duration: 3000,
      });
      return;
    }

    if (this.user.email == '' || this.user.email == null) {
      this.snack.open("email address is required!!", 'ok', {
        duration: 3000,
      });
      return;
    }

      if (this.user.phone == '' || this.user.phone == null) {
        this.snack.open("phone number is required!!", 'ok', {
          duration: 3000,
        });
        return;
      }

      // AddUser Method Calling From UserServices
      this.userService.addUser(this.user).subscribe(
        (data:any) => {
          //Success
          console.log(data)
          // alert("Success")
          Swal.fire("Succcessfully done!!","User is succcessfully registered and id is  " + data.id ,"success")
        },
        (error) => {
          //Error
          console.log(error)
          // alert("Something went to wrong!!!")
          // this.snack.open("Something went wrong!!!",'ok',{
          //   duration: 3000,
          // });
         Swal.fire("Oops...", error.error.text,"error")
          // this.snack.open(error.error.text,"ok");
        }
      );

    }

  }
