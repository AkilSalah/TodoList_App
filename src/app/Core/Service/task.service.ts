import { Injectable } from '@angular/core';
import { Status, Task } from '../Models/task.model';
import { Observable, of } from 'rxjs';
import { data } from 'autoprefixer';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private storageKey = "task"
  constructor() { }

  getTasks() : Task[]{
   return JSON.parse(localStorage.getItem(this.storageKey )|| '[]');
  }

  getTaskByCategories(categoryId : number) :Task[]{
    const tasks = this.getTasks();
    return tasks.filter(task => task.categoryId === categoryId)
  }

  saveTask(tasks: Task[] ) : void{
    localStorage.setItem(this.storageKey,JSON.stringify(tasks));
  }

  addTask(task: Task): void{
    const taskList = this.getTasks();
    task.id = Date.now();
    taskList.push(task);
    this.saveTask(taskList);
  }

  updateTask(taskUpdated : Task) : void{
    const taskList = this.getTasks().map(task => {
      if(task.id == taskUpdated.id){
        return taskUpdated
      }else{
       return task
      }
    });
    this.saveTask(taskList);
  }

  deleteTask(id : number):void{
    const taskList = this.getTasks().filter(task => task.id !== id );
    this.saveTask(taskList);
  }
  getTaskStat(): Observable<{
    completed: number;
    pending: number;
    overdue: number;
  }> {
    const currentDate = new Date();
    const tasks = this.getTasks();
  
    let completed = 0;
    let pending = 0;
    let overdue = 0;
  
    tasks.forEach(task => {
      if (task.status === Status.COMPLETED) {
        completed++;
      } else if (task.status === Status.IN_PROGRESS || task.status === Status.NOT_STARTED) {
        if (task.dueDate && new Date(task.dueDate) < currentDate) {
          overdue++;
        } else {
          pending++;
        }
      }
    });
  
    return of({ completed, pending, overdue });
  }
  
}
