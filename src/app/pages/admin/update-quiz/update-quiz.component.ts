import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  qId = 0;//undefined
  quiz;
  categories;


  //ActivatedRoute predefined 
  constructor(
    private _route : ActivatedRoute,
    private _quizService :QuizService, 
    private _categoryService: CategoryService,
    private _snackBar: MatSnackBar,
    private router: Router,
    ) { }

  ngOnInit(): void {

    this.qId = this._route.snapshot.params.qid;
    // console.log(this.qId);
    this._quizService.getSingleQuiz(this.qId).subscribe(
      (data:any)=>{
        //success
        this.quiz = data;
        console.log(this.quiz);
    },
    (error)=>{
      //error
      console.log(error);
    });

    this._categoryService.categories().subscribe(
      (data:any)=>{
        //loading categories from server
        this.categories = data;
        console.log(this.categories);
      },
      (error)=>{
        //error
        console.log(error);

      }
    );
  }

  //update quiz
  public updateQuiz(){

        if (this.quiz.title.trim() == '' || this.quiz.title == null){
          this._snackBar.open('title is required!!','ok',{
            duration:3000,
          });
          return;
      }

      if (this.quiz.description.trim() == '' || this.quiz.description == null){
        this._snackBar.open('description is required!!','ok',{
          duration:3000,
        });
        return;
    }

    if (this.quiz.maxMarks.trim() == '' || this.quiz.maxMarks == null){
      this._snackBar.open('Max Marks is required!!','ok',{
        duration:3000,
      });
      return;
    }
    if (this.quiz.numberOfQuestions.trim() == '' || this.quiz.numberOfQuestions == null){
      this._snackBar.open('Number of questions is required!!','ok',{
        duration:3000,
      });
      return;
    }

    if (this.quiz.category.cid == '' || this.quiz.category.cid == null){
    this._snackBar.open('category is required!!','ok',{
      duration:3000,
    });
    return;
    }  

    //Now calling server to update quiz
    this._quizService.updatingQuizById(this.quiz).subscribe(
      (data:any)=>{
        //success
          this.quiz.title = '',
          this.quiz.description = '',
          this.quiz.maxMarks = '',
          this.quiz.numberOfQuestions = '',
          this.quiz.category.cid = '',
        Swal.fire('Success', 'Quiz updated..', 'success').then((e)=>{
          //clicking ok then navigate to view quiz
          this.router.navigate(['/admin/quizzes']);
        });
      },
      (error)=>{
        //error
        Swal.fire('Error', 'Server error while updating quiz','error');
      });
}

}
