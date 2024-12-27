import { Component } from '@angular/core';
import { TaskService } from '../../Core/Service/task.service';
import { Priority, Status, Task } from '../../Core/Models/task.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  tasks : Task[] = [];
  task: Task = {
    id: 0,
    title: '',
    description : '',
    dueDate: new Date(),
    priority: Priority.MEDIUM,
    status: Status.NOT_STARTED
  };  
  
  constructor(private taskService : TaskService,private route: ActivatedRoute){}

  ngOnInit(): void {
    const categoryId = Number(this.route.snapshot.queryParams['categoryId']);
    if (categoryId) {
      this.task.categoryId = categoryId;
    }
    this.loadTasks(); 
   }

  loadTasks() {
    this.tasks = this.taskService.getTasks();
  }
  loadTasksByCategory(categoryId : number) {
    this.tasks = this.taskService.getTasks().filter(t => t.categoryId === categoryId);
  }

  saveTask():void{
    if(this.task.id){
      this.taskService.updateTask(this.task);
    }else{
      this.taskService.addTask(this.task);
    }
    this.resetForm();
    this.loadTasks();
  }

  deleteTask(id : number) : void{

    if (confirm('Are you sure you want to delete this category?')) {
      this.taskService.deleteTask(id);
      this.loadTasks();
    }
  }

  editTask(task :any ) {
    this.task = { ...task }
  }

  resetForm() {
    const currentCategoryId = this.task.categoryId;
    this.task = {
      id: 0,
      title: '',
      dueDate: new Date(),
      priority: Priority.MEDIUM,
      status: Status.NOT_STARTED,
      categoryId : currentCategoryId
    };
  }

  get priorities() {
    return Object.values(Priority);
  }

  get statuses() {
    return Object.values(Status);
  }
}
