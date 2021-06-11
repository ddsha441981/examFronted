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
}
