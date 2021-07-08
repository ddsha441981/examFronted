import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _http :HttpClient) { }

  //get all quizess from server(database)
  public quizess(){
    return this._http.get(`${baseUrl}/quiz/`);
  }

  //add quiz
  public addingNewQuiz(quizData){
    return this._http.post(`${baseUrl}/quiz/`,quizData);
  }

  //delete quiz
  public quizDelete(qid){
    return this._http.delete(`${baseUrl}/quiz/${qid}`);
  }

  //get the single quiz
  public getSingleQuiz(qid){
    return this._http.get(`${baseUrl}/quiz/${qid}`);
  }

  //update the quiz by Id
  public updatingQuizById(quizUpdate){
    return this._http.put(`${baseUrl}/quiz/`,quizUpdate);
  }

  // Get Specfic Quizzes by Category
  public getQuizzesOfCategory(cid){
    return this._http.get(`${baseUrl}/quiz/category/${cid}`);
  }


  // Get Active Quizzs
  public getActiveQuzzes(){
    return this._http.get(`${baseUrl}/quiz/active`);
  }

  public getActiveQuzzesOfCategory(cid){
    return this._http.get(`${baseUrl}/quiz/active/category/${cid}`);
  }
}
