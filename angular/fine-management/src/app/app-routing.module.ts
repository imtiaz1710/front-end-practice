import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SideAndNavBarComponent } from './shared/side-and-nav-bar/side-and-nav-bar.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path:'signup', component: SignupComponent },
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'sideAndNavBar', component: SideAndNavBarComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes), ReactiveFormsModule, FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
