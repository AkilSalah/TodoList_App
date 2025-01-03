import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../Core/Service/task.service';
import { SearchService } from '../../Core/Service/search.service';
import { Priority, Status, Task } from '../../Core/Models/task.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  searchText: string = '';
  filteredTasks: Task[] = [];
  tasks: Task[] = [];
  isModalOpen: boolean = false;

  task: Task = {
    id: 0,
    title: '',
    description: '',
    dueDate: new Date(),
    priority: Priority.MEDIUM,
    status: Status.NOT_STARTED
  };

  categoryId?: number;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private searchService: SearchService,
    private datePipe : DatePipe
  ) {}

  formatDate(dueDate: string): string {
    return this.datePipe.transform(dueDate, 'dd/MM/yyyy HH:mm')!;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['categoryId']) {
        this.categoryId = Number(params['categoryId']);
        this.task.categoryId = this.categoryId;
      }
      this.loadTasks();
    });

    this.searchService.searchText$.subscribe(text => {
      this.searchText = text;
      this.filterTasks();
    });
  }

  toggleModal(): void {
    this.isModalOpen = !this.isModalOpen;
    if (!this.isModalOpen) {
      this.resetForm();
    }
  }

  loadTasks(): void {
    if (this.categoryId) {
      this.taskService.getTaskByCategories(this.categoryId).subscribe(tasks => {
        this.tasks = tasks;
        this.filterTasks();
      });
    } else {
      this.taskService.getTasks().subscribe(tasks => {
        this.tasks = tasks;
        this.filterTasks();
      });
    }
  }


  filterTasks(): void {
    if (this.searchText.trim()) {
      const lowerCaseSearchText = this.searchText.toLowerCase();
      this.filteredTasks = this.tasks.filter(task =>
        task.title.toLowerCase().includes(lowerCaseSearchText) ||
        task.description.toLowerCase().includes(lowerCaseSearchText)
      );
    } else {
      this.filteredTasks = [...this.tasks];
    }
  }

  saveTask(): void {
    
    const exitTitle = this.tasks.some(
      (t) => t.title.toLowerCase() === this.task.title.toLowerCase() && t.id !== this.task.id
    );
    if (exitTitle) {
      alert('Une tâche avec ce titre existe déjà. Veuillez utiliser un titre différent.');
      return;
    }
  
    const descriptionLength = this.task.description.length;
    if (descriptionLength < 10 || descriptionLength > 100) {
      alert('La description doit contenir entre 10 et 100 caractères.');
      return;
    }
  
    if (!this.task.dueDate) {
      alert('Veuillez sélectionner une date valide.');
      return;
    }
  
    const currentDate = new Date();
    const dueDate = new Date(this.task.dueDate);
    if (dueDate < currentDate) {
      alert('La date d\'échéance ne peut pas être dans le passé.');
      return;
    }
  
    if (!this.task.title || !this.task.description || !this.task.dueDate) {
      alert('Tous les champs sont obligatoires.');
      return;
    }
  
    if (this.task.id) {
      this.taskService.updateTask(this.task);
    } else {
      this.taskService.addTask(this.task);
    }
  
    this.toggleModal();
    this.loadTasks();
  }
  
  deleteTask(id: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id);
      this.loadTasks();
    }
  }

  editTask(task: Task): void {
    this.task = { ...task };
    this.toggleModal();
  }

  resetForm(): void {
    const currentCategoryId = this.task.categoryId;
    this.task = {
      id: 0,
      title: '',
      dueDate: new Date(),
      description: '',
      priority: Priority.MEDIUM,
      status: Status.NOT_STARTED,
      categoryId: currentCategoryId
    };
  }

  get priorities() {
    return Object.values(Priority);
  }

  get statuses() {
    return Object.values(Status);
  }
}