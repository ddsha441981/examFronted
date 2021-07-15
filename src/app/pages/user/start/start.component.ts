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
  qid;
  questions;

  // Calculating marks
  marksGot = 0;
  correctAnswers = 0;
  attempted  = 0;
  isSubmit = false;
  isTimer: any;

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

        // Timmer will start while questions is loading
        this.isTimer = this.questions.length * 2 * 60;

        // // add new key and value for user given answers
        // this.questions.forEach((q)=>{
        //   q['givenAnswer'] = '';
        // });

        console.log(this.questions);
        //Start timer function here
        this.startTimmer();
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

  // Submit Quiz and calculating
  submitQuiz(){

          Swal.fire({
            title: 'Do you want submit quiz',
            showCancelButton: true,
            confirmButtonText:'Submit Quiz',
            icon: 'warning',
          }).then((e)=>{
            if(e.isConfirmed){
              // User manually submit quiz then ask confirmation before submited quiz
              this.evalQuiz();
            }
          })
  }

  startTimmer(){
    let t = window.setInterval(()=>{
      //code
      if(this.isTimer <=0){

        // After Completing time quiz will submitedd automatically without confirmation
        this.evalQuiz();
        clearInterval(t);
      }else{
        this.isTimer--;
      }
    },1000);
  }

  //time formated
  getFormatedTime(){
    let min = Math.floor(this.isTimer / 60);
    let sec = this.isTimer - min * 60;
    return `${min} Min : ${sec} Sec`;
    
  }

  evalQuiz() {
               //calculations here
              //  Call to server to check questions
              this._questionService.validateQuestionsAndAnswer(this.questions).subscribe(
                (data:any)=>{
                  console.log(data);
                  this.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
                  this.correctAnswers = data.correctAnswers;
                  this.attempted = data.attempted;
                  this.isSubmit = true;
                  console.log("=====================> " , this.correctAnswers);
                },
                (error)=>{
                  //error
                  console.log(error);
                }
              )

        // this.isSubmit = true;
    //             this.questions.forEach((q)=>{
    //               if (q.givenAnswer == q.answer){
    //                   this.correctAnswers++;
    //                   let marksSingle = this.questions[0].quiz.maxMarks / this.questions.length;
    //                   this.marksGot += marksSingle;
    //               }
    //               //Calculating attpemting questions
    //               if(q.givenAnswer.trim() != ''){
    //                  this.attempted++;
    //               }
    //             });
                  // console.log("Correct Answers :" + this.correctAnswers);
                  // console.log('Marks got' + this.marksGot);
                  // console.log('Question Attempted' + this.attempted++);
                  // console.log(this.questions);
  }


  // Print Page
  printPage(){
    window.print();
  } 

}


