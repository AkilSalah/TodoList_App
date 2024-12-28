import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../Core/Service/task.service';
import { Chart, registerables } from 'chart.js';
import { Priority, Status, Task } from '../../Core/Models/task.model';

Chart.register(...registerables);

interface TaskStats {
  completed: number;
  pending: number;
  overdue: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  stats: TaskStats = {
    completed: 0,
    pending: 0,
    overdue: 0,
  };
  
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadStats();
    this.loadCharts();
  }

  loadStats(): void {
    this.taskService.getTaskStat().subscribe({
      next: (data: TaskStats) => {
        this.stats = data;
      },
      error: (error) => {
        console.error('Error loading stats:', error);
      }
    });
  }

  loadCharts(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks: Task[]) => {
        this.tasks = tasks;
        const priorityCounts = this.getPriorityCounts(tasks);
        const statusCounts = this.getStatusCounts(tasks);
        this.createPriorityChart(priorityCounts);
        this.createStatusChart(statusCounts);
      },
      error: (error) => {
        console.error('Error loading tasks:', error);
      }
    });
  }

  getPriorityCounts(tasks: Task[]): Record<Priority, number> {
    return {
      [Priority.HIGH]: tasks.filter(t => t.priority === Priority.HIGH).length,
      [Priority.MEDIUM]: tasks.filter(t => t.priority === Priority.MEDIUM).length,
      [Priority.LOW]: tasks.filter(t => t.priority === Priority.LOW).length
    };
  }

  getStatusCounts(tasks: Task[]): Record<Status, number> {
    return {
      [Status.NOT_STARTED]: tasks.filter(t => t.status === Status.NOT_STARTED).length,
      [Status.IN_PROGRESS]: tasks.filter(t => t.status === Status.IN_PROGRESS).length,
      [Status.COMPLETED]: tasks.filter(t => t.status === Status.COMPLETED).length
    };
  }

  createPriorityChart(priorityCounts: Record<Priority, number>): void {
    const ctx = document.getElementById('priorityChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: Object.keys(priorityCounts),
          datasets: [{
            data: Object.values(priorityCounts),
            backgroundColor: [
              'rgba(220, 38, 38, 0.8)',  // rouge pour HIGH
              'rgba(249, 115, 22, 0.8)',  // orange pour MEDIUM
              'rgba(34, 197, 94, 0.8)'    // vert pour LOW
            ],
            borderColor: 'white',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: 'white'
              }
            },
            title: {
              display: true,
              text: 'Répartition par Priorité',
              color: 'white',
              font: {
                size: 16
              }
            }
          }
        }
      });
    }
  }

  createStatusChart(statusCounts: Record<Status, number>): void {
    const ctx = document.getElementById('statusChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Object.keys(statusCounts),
          datasets: [{
            label: 'Nombre de tâches',
            data: Object.values(statusCounts),
            backgroundColor: [
              'rgba(234, 179, 8, 0.8)',    // jaune pour NOT_STARTED
              'rgba(59, 130, 246, 0.8)',    // bleu pour IN_PROGRESS
              'rgba(34, 197, 94, 0.8)'      // vert pour COMPLETED
            ],
            borderColor: 'white',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false
            },
            title: {
              display: true,
              text: 'État des Tâches',
              color: 'white',
              font: {
                size: 16
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(255, 255, 255, 0.1)'
              },
              ticks: {
                color: 'white'
              }
            },
            x: {
              grid: {
                display: false
              },
              ticks: {
                color: 'white'
              }
            }
          }
        }
      });
    }
  }
}