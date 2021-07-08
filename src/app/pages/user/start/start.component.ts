import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  //Local variable
  qid
  questions
  constructor(private _locationSt : LocationStrategy, private _route : ActivatedRoute,private _questionService: QuestionService) { }

  ngOnInit(): void {

    this.qid = this._route.snapshot.params.qid;
    this.loadQuestions();

    this.preventBackButton();
  }


  loadQuestions() {
    
    this._questionService.getQuestionsOfQuizByIdAndTest(this.qid).subscribe(
      (data:any)=>{
        //success
        this.questions = data;
        console.log(this.questions);
      },
      (error)=>{
        //error
        Swal.fire("Error","Server error while loading questions","error");
      },
    );
  }
   //Prevent to back button
   preventBackButton(){
      
    history.pushState(null,null,location.href);
    this._locationSt.onPopState(()=>{
      history.pushState(null,null,location.href);
    });

  }

}
