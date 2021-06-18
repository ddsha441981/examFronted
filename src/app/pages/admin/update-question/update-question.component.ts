import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {
quesId;
updateQuestion;
  constructor(private _route: ActivatedRoute,
     private _questionService: QuestionService, private _snackBar: MatSnackBar,   private _router : Router) { }

  ngOnInit(): void {
    this.quesId = this._route.snapshot.params.quesId;
    this._questionService.particularQuestionById(this.quesId).subscribe(
      (data:any)=>{
        //success
        console.log(data);
        this.updateQuestion = data;

      },
      (error)=>{
        //error
        // console.log(error);
        Swal.fire('Error' , 'Server error while loading data' , 'error'); 
      },
    );
  }

  //Updating question while submit form
  public updatingWhileSubmitQuestion(){

    //validation
    if (this.updateQuestion.content.trim() == '' || this.updateQuestion.content == null) {
      this._snackBar.open('Question is required!!', 'ok', {
        duration: 3000,
      });
      return;
    }

    if (this.updateQuestion.option1.trim() == '' || this.updateQuestion.option1 == null) {
      this._snackBar.open('Option 1 is required!!', 'ok', {
        duration: 3000,
      });
      return;
    }

    if (this.updateQuestion.option2.trim() == '' || this.updateQuestion.option2 == null) {
      this._snackBar.open('Option 2 is required!!', 'ok', {
        duration: 3000,
      });
      return;
    }

    // if (this.updateQuestion.option3.trim() == '' || this.updateQuestion.option3 == null){
    //   this._snackBar.open('Option 3 is required!!','ok',{
    //     duration: 3000,
    //   });
    //   return;
    // }

    // if (this.updateQuestion.option4.trim() == '' || this.updateQuestion.option4 == null){
    //   this._snackBar.open('Option 4 is required!!','ok',{
    //     duration: 3000,
    //   });
    //   return;
    // }

    if (this.updateQuestion.answer.trim() == '' || this.updateQuestion.answer == null) {
      this._snackBar.open('Answer is required!!', 'ok', {
        duration: 3000,
      });
      return;
    }

    //Now calling the server to updating question

    this._questionService.updateQuestionById(this.updateQuestion).subscribe(
      (data)=>{
        //success
        // console.log(this.updateQuestion);'
        this.updateQuestion.content = '',
        this.updateQuestion.option1 = '',
        this.updateQuestion.option2 = '',
        this.updateQuestion.option3 = '',
        this.updateQuestion.option4 = '',
        this.updateQuestion.answer = '',
        Swal.fire('Success' , 'Question Updated!!!' , 'success').then((e)=>{
           //clicking ok then navigate to All questions
           this._router.navigate(['/admin/view-questions/']);// some problem while routing i'll fix later
        });
      },
      (error)=>{
        //error
        // console.log(error);
        Swal.fire('error' , 'Server error while updating question', 'error');
      },
    );
  }

}
