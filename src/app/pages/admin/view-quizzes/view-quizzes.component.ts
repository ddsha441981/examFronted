import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizdata = [
    //dummy data
    // {
    //   qid:27,
    //   title:"Java Basic",
    //   description:"This is java basic content",
    //   maxMarks: "200",
    //   numberOfQuestions:"20",
    //   active:"True",
    //   category:{
    //     title:"Programming",
    //   },
    // },

    // {
    //   qid:27,
    //   title:"Java Basic",
    //   description:"This is java basic content",
    //   maxMarks: "200",
    //   numberOfQuestions:"20",
    //   active:"True",
    //   category:{
    //     title:"Programming",
    //   },
    // },

    // {
    //   qid:27,
    //   title:"Java Basic",
    //   description:"This is java basic content",
    //   maxMarks: "200",
    //   numberOfQuestions:"20",
    //   active:"True",
    //   category:{
    //     title:"Programming",
    //   },
    // },
  ];

  constructor(private _quizService: QuizService) { }

  ngOnInit(): void {
    this._quizService.quizess().subscribe(
      (data: any) => {
        //success
        this.quizdata = data;
      },
      (error) => {
        //error
        console.log(error);
        Swal.fire('Error', 'Error in Lodaing data from the server', 'error');
      });

    // if (this.active == false){

    // }

  }

  //delete Quiz
  deleteQuiz(qid) {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure ?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {

      if (result.isConfirmed) {

        //delete here

        this._quizService.quizDelete(qid).subscribe(
          (data) => {
            //quiz filter after deleting
            this.quizdata = this.quizdata = this.quizdata.filter((quiz) => quiz.qid != qid);
            //success
            Swal.fire('Success', 'Quiz deleted!!', 'success');
          },
          (error) => {
            //error
            Swal.fire('Error', 'Error in deleting quiz', 'error');
          },
        );

      }
    });
  }

}
