import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { Error404Component } from './pages/errorpage/error404/error404.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { UserGuard } from './services/user.guard';

const routes: Routes = [

  // For Home Page
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  
  // For Signup Page
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full',
  },

  // For Login Page
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },

  //For Admin Dashboard
  {
    path: 'admin',
    component: DashboardComponent,
    // pathMatch: 'full',
    //Admin Gaurd
    canActivate: [AdminGuard],

    //for profile content dashboard content
    children:[
      {
        path: '',
        component: WelcomeComponent,
      },
      
      {
        path: 'profile',
        component: ProfileComponent,
      },

      {
        path: 'error404',
        component:Error404Component,
      }
    ],
  },

  //For Normal User Dashboard
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    pathMatch: 'full',
    //Normal User Gaurd
    canActivate: [UserGuard],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
