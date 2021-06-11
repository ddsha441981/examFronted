import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //event
  public loginStatusSubject =  new Subject<boolean>();

  constructor(private _http: HttpClient) { }

  // Login Service

  //Generate Token
  public generateToken(loginData: any) {

    return this._http.post(`${baseUrl}/generate-token`, loginData);
  }

  //Login User : Set token in LocalStorage
  public loginUser(token) {
    localStorage.setItem("token", token);
    return true;
  }

  //Current User :  get current loggedin user
  public getCurrentUser(){
    return this._http.get(`${baseUrl}/current-user`);
  }

  //User is Logged in or not
  public isLoggedIn() {
    let tokenStr = localStorage.getItem("token");
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }

  //logOut : remove token from localStorage to logOut the user
  public logOut(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }

  //get token
  public getToken(){
    return localStorage.getItem("token");
  }

  //set userDetails
  public setUser(user){
    localStorage.setItem("user",JSON.stringify(user));
  }

  //get UserDetails
  public getUser(){
    let userStr = localStorage.getItem("user");
    if (userStr != null){
      return JSON.parse(userStr);
    }else{
      this.logOut();
      return null;
    }
  }

  //get user role
  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority
  }

  // get all users count for admin 
  public getUserCount(){
    return this._http.get(`${baseUrl}/usercount`);
  }

}
