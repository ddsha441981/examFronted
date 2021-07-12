import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http: HttpClient) { }

  public getQuestionsOfQuiz(qid) {
    return this._http.get(`${baseUrl}/question/quiz/all/${qid}`);
  }

  public getQuestionsOfQuizByIdAndTest(qid) {
    return this._http.get(`${baseUrl}/question/quiz/${qid}`);
  }


  //add questions
  public addQuestion(questions){
    return this._http.post(`${baseUrl}/question/`,questions);
  }

  //getting particular question from the sever by using Id
  public particularQuestionById(quesId){
    return this._http.get(`${baseUrl}/question/${quesId}`);
  }

  //question update
  public updateQuestionById(questions){
    return this._http.post(`${baseUrl}/question/`,questions);
  }

  //delete particular question by Id
  public deletingParticularQuestion(quesId){
    return this._http.delete(`${baseUrl}/question/${quesId}`);
  }

  //to validate questions answers call to server and check questions answer on sever
  public validateQuestionsAndAnswer(questions){
    return this._http.post(`${baseUrl}/question/eval-quiz`,questions);
  }
}
