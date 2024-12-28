import { Component } from '@angular/core';
import { TaskService } from '../../Core/Service/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  stats: { completed: number; pending: number; overdue: number } = {
    completed: 0,
    pending: 0,
    overdue: 0,
  };
  constructor(private taskService : TaskService){}
  ngOnInit(): void { 
    this.loadStats();
  }
  loadStats() : void{
    this.taskService.getTaskStat().subscribe((data) =>  {
      this.stats= data;
    })
  }

}
