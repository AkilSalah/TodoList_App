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
}
