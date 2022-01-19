import { Component, OnInit } from '@angular/core'
import { TASKS } from '../../mock-tasks'
import { Task} from '../../Task'
import { TaskService } from '../../services/task.service'
import  { Observable, of } from 'rxjs'

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  constructor(private taskservice: TaskService) { }
  
  ngOnInit(): void {
    this.taskservice.getTasks().subscribe(
      (tasks) => this.tasks = tasks);
  } 
  
  deleteTask(task: Task){
    this.taskservice.deleteTask(task).subscribe(
      () => this.tasks = this.tasks.filter(t => t.id !==  task.id));
  }

  toggleReminder(task: Task){
    task.reminder = !task.reminder;
    this.taskservice.updateTaskReminder(task).subscribe();
  }

  addTask(task: Task){
    this.taskservice.addTask(task).subscribe((task) => this.tasks.push(task));
  }
}
