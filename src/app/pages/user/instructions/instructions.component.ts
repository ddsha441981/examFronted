import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
import { StartComponent } from '../start/start.component';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  // Local Variable
  qid
  quizessData
  constructor(private _route: ActivatedRoute, private _quizService: QuizService, private _router: Router) { }

  ngOnInit(): void {

    this.qid = this._route.snapshot.params.qid;
    console.log(this.qid);

    this._quizService.getSingleQuiz(this.qid).subscribe(
      (data:any)=>{
        //Success
        this.quizessData = data;
        // console.log(this.quizessData);
      },
      (error)=>{
        //error
        Swal.fire("Error" , "Server Error while loading quiz...");
      }
    );

  }
  startQuiz(){
    // this._router.
    // [routerLink]="'/start/'+qid"
    Swal.fire({
      title:'Do You want to start the quiz',
       showCancelButton:true,
       confirmButtonText: 'Start',
       denyButtonText: "Don't Start",
       icon: 'info',
    }).then((result)=>{
      if (result.isConfirmed){
        this._router.navigate(['/start/'+this.qid]);
      }else if(result.isDenied){
        Swal.fire("Changes are not saved", '' , 'info');
      }
    });
  }
  

}
