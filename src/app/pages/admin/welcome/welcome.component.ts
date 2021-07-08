import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import * as CanvasJS from '../../../../assets/canvas/canvasjs.min';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

   //Chart Data 
   saleData = [
    { name: "Mobiles", value: 105000 },
    { name: "Laptop", value: 55000 },
    { name: "AC", value: 15000 },
    { name: "Headset", value: 150000 },
    { name: "Fridge", value: 20000 }
  ];

  cardList = [
    {
      cid:23,
      title:"programming",
    },

    {
      cid:23,
      title:"programming",
    },

    {
      cid:23,
      title:"programming",
    },

    {
      cid:23,
      title:"programming",
    },
  ];
    //this is a variable that hold number
    users= 0;
    //same process
    accuratecount:number = 0;
    clientcount:number = 0;
    customerfeedback:number = 0;

  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
  
    this.loginService.getUserCount().subscribe(
      (data: any)=>{
        // console.log(userList);
        this.users=data;
      },
      (error) =>{
        console.log(error);
      },
    );
    
  }
  //we have created setinterval function with arrow function and
  //and set them in a variable that is projectcountstop.
  projectcountstop:any = setInterval(()=>{
    this.users++;
    //we need to stop this at  particular point; will use if condition
    if(this.users == this.users)
    {
      //clearinterval will stop tha function
      clearInterval(this.projectcountstop);
    }

  },10) //10 is milisecond you can control it


  accuratecountstop:any = setInterval(()=>{
    this.accuratecount++;
    if(this.accuratecount == 97)
    {
      
      clearInterval(this.accuratecountstop);
    }
  },10) 


  clientcountstop:any = setInterval(()=>{
    this.clientcount++;
    if(this.clientcount == 5000)
    {
      
      clearInterval(this.clientcountstop);
    }
  },10)

  customerfeedbackstop:any = setInterval(()=>{
    this.customerfeedback++;
    if(this.customerfeedback == 100)
    {
      
      clearInterval(this.customerfeedbackstop);
    }
  },10)

  //conclusion: we have use
  //string interpolation
  //setInterval function
  //()=> arrow function
  //clearInterval 
  //creating variable



}
