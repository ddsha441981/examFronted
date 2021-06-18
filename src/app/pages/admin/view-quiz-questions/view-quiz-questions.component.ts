import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  qId;
  qTitle;
  questions=[];
  constructor(
    private _route : ActivatedRoute,
    private _questionService: QuestionService,
  ) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params.qid;
    this.qTitle = this._route.snapshot.params.title;
    console.log(this.qId);
    console.log(this.qTitle);

    this._questionService.getQuestionsOfQuiz(this.qId).subscribe(
      (data: any)=>{
        //Success
        this.questions = data;
        // console.log(this.questions);
        

      },
      (error)=>{
        //error
        Swal.fire('Error',"Server error while loading data",'error');
      },
    );
  }

  //delete questions
  deleteQuestionById(qid){
   Swal.fire({
     icon: 'info',
     showCancelButton: true,
     confirmButtonText:'Delete',
     title:'Are you sure, want to delete this question?',
   }).then((result)=>{
      if (result.isConfirmed){
        //click on delete
        this._questionService.deletingParticularQuestion(qid).subscribe(
          (data)=>{
            //Success
            Swal.fire('Success' ,'Question deleted!!!' ,'success');
            //Now filter data (Questions)
            this.questions = this.questions.filter((q)=> q.quesId != qid);
          },
          (error)=>{
            //error
            Swal.fire('Error' ,'Server error while deleting question' ,'error');
          },
        );
      }
   });
  }

}
