import { Component } from '@angular/core';
import { CategoryService } from '../../Core/Service/category.service';
import { Category } from '../../Core/Models/category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  
  categories : Category[] = [];
  category: Category = { id: null, name: '' }; 

  constructor(private categoryService : CategoryService){}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories(){
    this.categories = this.categoryService.getCategories();
  }

  saveCategory(){
    if(!this.category.name || !this.category.name.trim()) {
      console.error("Le nom de la catégorie est vide ou invalide.");
      return; 
    }
    if(this.category.id){
      this.categoryService.updateCategory(this.category);
    }else{
      this.categoryService.addCategory(this.category);
    }
    this.resetForm();
    this.loadCategories();
  }

  deleteCategory(id : number){
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(id);
      this.loadCategories();
    }
  }

  editCategory(category: any) {
    this.category = { ...category }; 
  }

  resetForm() {
    this.category = { id: null, name: '' };
  }


}
