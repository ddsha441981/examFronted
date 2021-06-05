import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user = null;

  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
    //data fetch from local Storage
    // this.user = this.loginService.getUser();

    //data fetch from server
    this.loginService.getCurrentUser().subscribe(
      (user: any)=>{
        this.user= user;
      },
      (error)=>{
        console.log(error);
      },
    )
  }

}
