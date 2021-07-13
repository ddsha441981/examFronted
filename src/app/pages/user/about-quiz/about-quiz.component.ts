import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-about-quiz',
  templateUrl: './about-quiz.component.html',
  styleUrls: ['./about-quiz.component.css']
})
export class AboutQuizComponent implements OnInit {

  // Local Variable
  qid;
  viewQuizData;

  constructor(
    private _route:ActivatedRoute,
    private _quizService:QuizService) { }

  ngOnInit(): void {
    this.qid = this._route.snapshot.params.qid;
    console.log(this.qid);
    
    //method calling when ng init loading
    this.loadingQuizData(this.qid);
  }

  loadingQuizData(qid){

    this._quizService.getSingleQuiz(qid).subscribe(
      (data:any)=>{
        //success
        this.viewQuizData = data;
        console.log(this.viewQuizData);
      },
      (error)=>{
        //error
        Swal.fire('Error' , 'Server error while loading data', 'error');

      },
    )
  }

}
