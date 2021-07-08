import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  //Local veriable
  catId
  quizzList 
  constructor(private _route:ActivatedRoute, private _quizService: QuizService) { }

  ngOnInit(): void {
    this._route.params.subscribe((params)=>{
      this.catId =  params.catId;

      if (this.catId == 0){
        console.log("All Quizees loaded");
        this._quizService.getActiveQuzzes().subscribe(
          (data:any)=>{
           //Success
           this.quizzList = data;
           console.log(this.quizzList);
   
        },
        (error)=>{
         //Error
         Swal.fire("Error" , "Server Error while loading all quizes!!!!");
        }
        );
      }else{
        console.log("Specfic category laoded");
        this._quizService.getActiveQuzzesOfCategory(this.catId).subscribe(
          (data:any)=>{
            //success
            this.quizzList = data;
            console.log(this.quizzList);
          },
          (error)=>{
            //error
            Swal.fire("Error" ,"Server error while loading quizzes by category");
          },
        );
      }

    });
   
   
  }

}
