import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private storageKey = 'categories';

  constructor() { }

  getCategories() : any[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  saveCategories(categories : any[]) : void{
    localStorage.setItem(this.storageKey,JSON.stringify(categories));
  }

  addCategory(category : any) :void{
    const categories = this.getCategories();
    category.id = Date.now();
    console.log(category.id);
    categories.push(category);
    this.saveCategories(categories);
  }
  updateCategory(updatedCategory : any) : void{
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
