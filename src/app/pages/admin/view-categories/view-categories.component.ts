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
    this._categories.categories().subscribe((data: any)=>{
      //success
      this.categories = data;
      console.log(this.categories);
    },
    (error)=>{
      //error
      console.log(error);
      Swal.fire("Error!!","Server Error data is not loading!!!",'error');
    });
  }

}
