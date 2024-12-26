import { Injectable } from '@angular/core';
import { Category } from '../Models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private storageKey = 'categories';

  constructor() { }

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
    const categories = this.getCategories().filter(category => category.id !== id);
    this.saveCategories(categories);
    
  }
}
