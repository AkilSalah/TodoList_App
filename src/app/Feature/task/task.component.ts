import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../Core/Service/task.service';
import { SearchService } from '../../Core/Service/search.service';
import { Priority, Status, Task } from '../../Core/Models/task.model';

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
    private searchService: SearchService
  ) {}

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
      this.tasks = this.taskService.getTaskByCategories(this.categoryId);
    } else {
      this.tasks = this.taskService.getTasks();
    }
    this.filterTasks();
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