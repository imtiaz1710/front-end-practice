import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './core/pages/fine/dashboard/dashboard.component';
import { FineEntryComponent } from './core/pages/fine/fine-entry/fine-entry.component';
import { FineListComponent } from './core/pages/fine/fine-list/fine-list.component';
import { ReportComponent } from './core/pages/fine/report/report.component';
import { AddAndViewTransactionComponent } from './core/pages/transaction/add-and-view-transaction/add-and-view-transaction.component';
import { SideAndNavBarComponent } from './shared/side-and-nav-bar/side-and-nav-bar.component';
import { UserInfoComponent } from './core/pages/user/user-info/user-info.component';
import { LoginComponent } from './core/pages/auth/login/login.component';
import { SignupComponent } from './core/pages/auth/signup/signup.component';
import { LogoutComponent } from './core/pages/auth/logout/logout.component';
import { UsersComponent } from './core/pages/user/users/users.component';


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
      { path: 'users', component: UsersComponent },
      { path: 'user', component: UserInfoComponent },
      { path: 'transaction', component: AddAndViewTransactionComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ReactiveFormsModule, FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
