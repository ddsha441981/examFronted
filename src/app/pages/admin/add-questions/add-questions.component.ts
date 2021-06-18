import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.css']
})
export class AddQuestionsComponent implements OnInit {

  public Editor = ClassicEditor;

  qId;
  qTitle;
  questions = {
    quiz: {},
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
  }


  constructor(private _route: ActivatedRoute, private _questionService: QuestionService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params.qid;
    this.qTitle = this._route.snapshot.params.title;
    this.questions.quiz['qid'] = this.qId;
    this.questions.quiz['title'] = this.qTitle;
    console.log(this.qId, this.qTitle);
  }
  //add questions
  addQuestions() {
    //validation
    if (this.questions.content.trim() == '' || this.questions.content == null) {
      this._snackBar.open('Question is required!!', 'ok', {
        duration: 3000,
      });
      return;
    }

    if (this.questions.option1.trim() == '' || this.questions.option1 == null) {
      this._snackBar.open('Option 1 is required!!', 'ok', {
        duration: 3000,
      });
      return;
    }

    if (this.questions.option2.trim() == '' || this.questions.option2 == null) {
      this._snackBar.open('Option 2 is required!!', 'ok', {
        duration: 3000,
      });
      return;
    }

    // if (this.questions.option3.trim() == '' || this.questions.option3 == null){
    //   this._snackBar.open('Option 3 is required!!','ok',{
    //     duration: 3000,
    //   });
    //   return;
    // }

    // if (this.questions.option4.trim() == '' || this.questions.option4 == null){
    //   this._snackBar.open('Option 4 is required!!','ok',{
    //     duration: 3000,
    //   });
    //   return;
    // }

    if (this.questions.answer.trim() == '' || this.questions.answer == null) {
      this._snackBar.open('Answer is required!!', 'ok', {
        duration: 3000,
      });
      return;
    }

    //Now calling the server to add question
    this._questionService.addQuestion(this.questions).subscribe(
      (data) => {
        //success
        Swal.fire('Success', 'Question Added!!!', 'success');
        //after submit data form will be blank
        this.questions.content = ''
        this.questions.option1 = ''
        this.questions.option2 = ''
        this.questions.option3 = ''
        this.questions.option4 = ''
        this.questions.answer = ''
      },
      (error) => {
        //error
        Swal.fire('Error', 'Server error while adding Questions', 'error');
      },
    );
  }

}
