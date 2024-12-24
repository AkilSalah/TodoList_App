import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { TaskComponent } from './task/task.component';

const routes: Routes = [
  {path : "category" , component : CategoryComponent},
  {path : "task" , component : TaskComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
