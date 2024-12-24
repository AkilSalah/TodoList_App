import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { TaskComponent } from './task/task.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path : "category" , component : CategoryComponent},
  {path : "task" , component : TaskComponent},
  {path : "" , component : HomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
