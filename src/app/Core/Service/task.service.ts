import { Injectable } from '@angular/core';
import { Task } from '../Models/task.model';

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

}
