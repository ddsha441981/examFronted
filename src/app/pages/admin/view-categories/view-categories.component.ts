import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  constructor( private _categories:CategoryService) { }

  // Category data in array format
  categories = [
    // Dummy Data
    // {
    //   id:23,
    //   title:"Programming",
    //   description:"This is testing purpose",
    // },

    // {
    //   id:24,
    //   title:"Matmatices",
    //   description:"This is testing purpose",
    // },

    // {
    //   id:25,
    //   title:"General Knowledge",
    //   description:"This is testing purpose",
    // },
  ];

  ngOnInit(): void {
    this._categories.categories().subscribe(
      (data: any)=>{
      //success
      this.categories = data;
      // console.log(this.categories);
    },
    (error)=>{
      //error
      console.log(error);
      Swal.fire("Error","Error in Lodaing data from the server",'error');
    });
  }

  // Delete Category
  deleteCategory(cid){
    
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure ?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {

      if (result.isConfirmed) {

        //delete here
        this._categories.deleteCategory(cid).subscribe(
          (data) => {
            //quiz filter after deleting
            this.categories = this.categories = this.categories.filter((category) => category.cid != cid);
            // console.log(cid);
            // console.log(this.categories);
            //success
            Swal.fire('Success', 'Category deleted!!', 'success');
          },
          (error) => {
            //error
            Swal.fire('Error', 'Error in deleting Category', 'error');
          },
        );

      }
    });
  }
  

}
