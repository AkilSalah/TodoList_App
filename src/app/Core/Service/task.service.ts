import { Injectable } from '@angular/core';
import { Status, Task } from '../Models/task.model';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private storageKey = "task"
  constructor() { }

  getTasks(): Observable<Task[]> {
    const tasks: Task[] = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    return of(tasks);
  }

  getTaskByCategories(categoryId: number): Observable<Task[]> {
    return this.getTasks().pipe(
      map(tasks => tasks.filter(task => task.categoryId === categoryId))
    );
  }

  saveTask(tasks: Task[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }

  addTask(task: Task): void {
    this.getTasks().subscribe(taskList => {
      task.id = Date.now();
      taskList.push(task);
      this.saveTask(taskList);
    });
  }

  updateTask(taskUpdated: Task): void {
    this.getTasks().subscribe(taskList => {
      const updatedTaskList = taskList.map(task => 
        task.id === taskUpdated.id ? taskUpdated : task
      );
      this.saveTask(updatedTaskList);
    });
  }

  deleteTask(id: number): void {
    this.getTasks().subscribe(taskList => {
      const updatedTaskList = taskList.filter(task => task.id !== id);
      this.saveTask(updatedTaskList);
    });
  }

  getTaskStat(): Observable<{ completed: number; pending: number; overdue: number }> {
    const currentDate = new Date();
    return this.getTasks().pipe(
      map(tasks => {
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

        return { completed, pending, overdue };
      })
    );
  }
}