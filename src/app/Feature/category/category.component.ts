import { Component } from '@angular/core';
import { CategoryService } from '../../Core/Service/category.service';
import { Category } from '../../Core/Models/category.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  
  taskCounts: { [key: number]: number } = {}; 

  categories : Category[] = [];
  category: Category = {id:0 , name: '' };
  
  constructor(private categoryService : CategoryService){}

  ngOnInit() {
    this.loadCategories();
    this.loadTaskNumbre();
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
    this.loadTaskNumbre();
  }

  deleteCategory(id : number | undefined){
    if (id) { 
      if (confirm('Are you sure you want to delete this category?')) {
          this.categoryService.deleteCategory(id);
          this.loadCategories();
          this.loadTaskNumbre();
      }
  }
  }

  editCategory(category: any) {
    this.category = { ...category }; 
  }

  resetForm() {
    this.category = { id: 0, name: '' };
  }

  loadTaskNumbre(){
    this.categories.forEach(cate => {
      this.categoryService.getTasksNumber(cate.id).subscribe(count =>{
        this.taskCounts[cate.id] = count;
      })
    })
  }

}
