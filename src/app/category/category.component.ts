import { Component } from '@angular/core';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  categories : any[] = [];
  category: any = { id: null, name: '' };
  constructor(private categoryService : CategoryService){}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories(){
    this.categories = this.categoryService.getCategories();
  }

  saveCategory(){
    if(this.category.id){
      this.categoryService.updateCategory(this.category);
    }else{
      this.categoryService.addCategory(this.category);
    }
    this.resetForm();
    this.loadCategories();
  }

  deleteCategory(id : number){
    this.categoryService.deleteCategory(id);
    this.loadCategories();
  }

  editCategory(category: any) {
    this.category = { ...category }; 
  }

  resetForm() {
    this.category = { id: null, name: '' };
  }


}
