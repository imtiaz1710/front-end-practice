import { Component, OnInit } from '@angular/core';
interface ITodoItem{
  assignedTo: string;
  description: string;
}
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todoList: ITodoItem[] = [
    {assignedTo: 'superman', description: 'shop for kryptonite'},
    {assignedTo: 'Homelander', description: 'Do some crazy stuff'}
  ];

newTodoItem = {
  assignedTo : '',
  description : ''
}
  

  addItem(){
    this.todoList.push(this.newTodoItem);
  }

  removeItem(item: ITodoItem){
    this.todoList.splice(this.todoList.indexOf(item), 1);
  }

  constructor() { }

  ngOnInit(): void {
  }
}
