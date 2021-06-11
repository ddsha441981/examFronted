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

  constructor(private _quizService : QuizService) { }

  ngOnInit(): void {
    this._quizService.quizess().subscribe(
      (data:any)=>{
      //success
        this.quizdata = data;
        console.log(this.quizdata)
    },
    (error)=>{
     //error
     console.log(error);
     Swal.fire('Error','Error in Lodaing data from the server','error');
    });
    
   }

}
