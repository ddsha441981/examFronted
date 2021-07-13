import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http:HttpClient) { }

  // load all the categories
  public categories(){
    return this._http.get(`${baseUrl}/category/`);
  }

  // Add category
  public addCategory(category){

    return this._http.post(`${baseUrl}/category/`, category);
  }

  // delete category
  public deleteCategory(cid){
    return this._http.delete(`${baseUrl}/category/${cid}`);
  }
  // get category by id
  public getCategoryById(cid){
    return this._http.get(`${baseUrl}/category/${cid}`);
  }

  // updating category 
  public updatingCategory(category){
    return this._http.put(`${baseUrl}/category/`,category);
  }
}

