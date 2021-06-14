import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/question.service';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {
quesId;
updateQuestion;
  constructor(private _route: ActivatedRoute, private _questionService: QuestionService) { }

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
        console.log(error);
      },
    );
  }

}
