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

  saveCategorie(categories : any[]) : void{
    localStorage.setItem(this.storageKey,JSON.stringify(categories));
  }

  addCategory(category : any) :void{
    const categories = this.getCategories();
    categories.push(category);
    this.saveCategorie(categories);
  }
  updateCategory(updatedCategory : any) : void{
    const categories = this.getCategories().map(category =>{
      if(category.id === updatedCategory.id){
      return updatedCategory
      }else{
       return category
      }
    });
    this.saveCategorie(categories);
  }

  deleteCategory(id:number) : void{
    const categories = this.getCategories().filter(category => category.id !== id);
    this.saveCategorie(categories);
    
  }
}
