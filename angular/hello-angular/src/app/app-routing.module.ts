import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { DataBindingComponent } from './data-binding/data-binding.component';
import { TodoListComponent } from './todo-list/todo-list.component';

const routes: Routes = [
  {path : 'customers', component: CustomerComponent},
  {path: 'dataBinding', component: DataBindingComponent},
  {path: 'todo', component: TodoListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
