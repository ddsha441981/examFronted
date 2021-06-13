import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

interface Food {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  // Form data binding
  quizData = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: true,
    category:{
      cid:'',
    },
  };

  categories = [
    //Dummy data
    // {
    //   cid:23,
    //   title:"programming",
    // },

    // {
    //   cid:23,
    //   title:"programming",
    // }
  ];
  constructor(private _categoryService: CategoryService, private _quizService :QuizService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    
    this._categoryService.categories().subscribe(
      (data: any)=>{
        //success
        this.categories = data;
        console.log(this.categories);
      },
      (error)=>{
        //error
        console.log(error);
        Swal.fire("Oop's",'Server error while loading data!!!','error');
      });
  }

  //add quiz
  public addQuiz(){
          if (this.quizData.title.trim() == '' || this.quizData.title == null){
              this._snackBar.open('title is required!!','ok',{
                duration:3000,
              });
              return;
          }

          if (this.quizData.description.trim() == '' || this.quizData.description == null){
            this._snackBar.open('description is required!!','ok',{
              duration:3000,
            });
            return;
        }

        if (this.quizData.maxMarks.trim() == '' || this.quizData.maxMarks == null){
          this._snackBar.open('Max Marks is required!!','ok',{
            duration:3000,
          });
          return;
      }
        if (this.quizData.numberOfQuestions.trim() == '' || this.quizData.numberOfQuestions == null){
          this._snackBar.open('Number of questions is required!!','ok',{
            duration:3000,
          });
          return;
      }

      if (this.quizData.category.cid == '' || this.quizData.category.cid == null){
        this._snackBar.open('category is required!!','ok',{
          duration:3000,
        });
        return;
      }

      //Now call server
      this._quizService.addingNewQuiz(this.quizData).subscribe(
        (data)=>{
          //success
          this.quizData.title = '',
          this.quizData.description = '',
          this.quizData.maxMarks = '',
          this.quizData.numberOfQuestions = '',
          this.quizData.category.cid = '',
          Swal.fire('Success', 'Quiz added!!', 'success');
        },
        (error)=>{
          //error
          Swal.fire('Error', 'Server Error While adding Quiz Try Again!!', 'error');
        }
      )
  }

}
