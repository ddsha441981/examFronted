import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  categories;
  constructor(private _categoryService:CategoryService) { }

  ngOnInit(): void {
    // on Loading init method data loaded
    this._categoryService.categories().subscribe(
      (data:any)=>{
        // Success 
        this.categories = data;
        console.log(" data is " ,this.categories);

      },
      (error)=>{
        // Error
        Swal.fire("Error","Server Error while loading Categories","error");
      }
    )
  }

}
