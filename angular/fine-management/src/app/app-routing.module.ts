import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DashboardComponent } from './fine/dashboard/dashboard.component';
import { FineEntryComponent } from './fine/fine-entry/fine-entry.component';
import { FineListComponent } from './fine/fine-list/fine-list.component';
import { ReportComponent } from './fine/report/report.component';
import { SideAndNavBarComponent } from './shared/side-and-nav-bar/side-and-nav-bar.component';
import { UserInfoComponent } from './user/user-info/user-info.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '', component: LoginComponent, pathMatch: 'full' },
  {
    path: 'main',
    component: SideAndNavBarComponent,
    children: [
      { path: 'fineEntry', component: FineEntryComponent },
      { path: 'fineList', component: FineListComponent },
      { path: 'report', component: ReportComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'user', component: UserInfoComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ReactiveFormsModule, FormsModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
