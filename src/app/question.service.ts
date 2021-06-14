import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './services/helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http: HttpClient) { }

  public getQuestionsOfQuiz(qid) {
    return this._http.get(`${baseUrl}/question/quiz/all/${qid}`);
  }

  //add questions
  public addQuestion(questions){
    return this._http.post(`${baseUrl}/question/`,questions);
  }

  //getting particular question from the sever by using Id
  public particularQuestionById(quesId){
    return this._http.get(`${baseUrl}/question/${quesId}`);
  }
}
