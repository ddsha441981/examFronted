import { Component } from '@angular/core';
import {NavbarComponent} from './componets/navbar/navbar.component'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
    title = 'ExamForOnline';

    // user setting and API - which will fetch the saved
    // user has saved Dark Theme is equal to true else it will be false
    // isDarkTheme = false;
  
    // toggleTheme(){
    //   this.isDarkTheme = !this.isDarkTheme;
    // }

}
