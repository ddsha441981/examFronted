import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  constructor(private _categoryService : CategoryService ,private _snackbar :MatSnackBar) { }

  category = {
    title: '',
    description:'',
  };

  ngOnInit(): void {
  }

  //add category form submit method

  addCategoryFormSubmit(){

    if(this.category.title == '' || this.category.description == null){
      this._snackbar.open("category title required!!!!","ok",{
        duration:3000,
      });
      return;
    }

    if(this.category.description =='' || this.category.description == null){
      this._snackbar.open("category description required!!!","ok",{
        duration:3000,
      });
      return;
    }

    this._categoryService.addCategory(this.category).subscribe(
      //success
      (data:any)=>{
        this.category.title = '';
        this.category.description = '';
        Swal.fire("Success" , "Category added successfully!!!" , "success");
      },
      (error)=>{
        //Error
        Swal.fire("Oop's" ,"Server Error Try Again!!!" , "error");
      });
  }

}
