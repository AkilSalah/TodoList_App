import { Injectable } from '@angular/core';
import { Category } from '../Models/category.model';
import { TaskService } from './task.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private storageKey = 'categories';

  constructor(private taskService : TaskService) { }

  getCategories() : Category[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  saveCategories(categories : Category[]) : void{
    localStorage.setItem(this.storageKey,JSON.stringify(categories));
  }

  addCategory(category : Category) :void{
    const categories = this.getCategories();
    category.id = Date.now();
    console.log(category.id);
    categories.push(category);
    this.saveCategories(categories);
  }
  updateCategory(updatedCategory : Category) : void{
    const categories = this.getCategories().map(category =>{
      if(category.id === updatedCategory.id){
      return updatedCategory
      }else{
       return category
      }
    });
    this.saveCategories(categories);
  }

  deleteCategory(id:number) : void{
    this.taskService.deleteByCategories(id);
    const categories = this.getCategories().filter(category => category.id !== id);
    this.saveCategories(categories);
    
  }

  getTasksNumber(categoryId : number): Observable<number>{
    return this.taskService.getTasks().pipe(
      map(taskList => {
        return taskList.filter(task => task.categoryId === categoryId).length
      })
    )
  }
}
