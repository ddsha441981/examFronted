import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

  // local variable
  cid;
  catUpdateData;

  constructor(
    private _route:ActivatedRoute,
    private _categoryService: CategoryService,
    private _snackbar:MatSnackBar,
    private _router:Router,
    ) { }

  ngOnInit(): void {

    //Now get id from url with help of _route
    this.cid = this._route.snapshot.params.cid;
    console.log(this.cid);
    this._categoryService.getCategoryById(this.cid).subscribe(
      (data)=>{
        //success
        this.catUpdateData = data;
        // console.log(this.catUpdateData);
      },
      (error)=>{
        //error
        Swal.fire('Error' , 'Server error while loading data!!' , 'error');
      }
    );

  }

  updateCategoryONFormSubmit(){
    
    if(this.catUpdateData.title == '' || this.catUpdateData.description == null){
      this._snackbar.open("category title required!!!!","ok",{
        duration:3000,
      });
      return;
    }

    if(this.catUpdateData.description =='' || this.catUpdateData.description == null){
      this._snackbar.open("category description required!!!","ok",{
        duration:3000,
      });
      return;
    }

// calling server to updatiing category

    this._categoryService.updatingCategory(this.catUpdateData).subscribe(
      (data)=>{
        //success
       this.catUpdateData.title = '';
       this.catUpdateData.description = '';

        Swal.fire('Success' ,'category updated' ,'success').then((e)=>{
              //clicking ok then navigate to view Category Page
              this._router.navigate(['/admin/categories']);
        });
       
      },
      (error)=>{
        //error
        Swal.fire('Error' ,'Error while updating category' ,'error');
      }
    );
  }

}
