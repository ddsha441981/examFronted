import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ExamForOnline';

  // user setting and API - which will fetch the saved
  // user has saved Dark Theme is equal to true else it will be false
  isDarkTheme = true;

  toggleTheme(){
    this.isDarkTheme = !this.isDarkTheme;
  }
}
