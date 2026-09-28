import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TaskService } from '../../../core/services/task.service';
import { AuthService } from '../../../core/services/auth.service';
import { Task, TaskPriority, TaskStatus } from '../../../core/models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  loading = false;
  error = '';
  filterStatus: 'all' | TaskStatus = 'all';

  TaskStatus = TaskStatus;
  TaskPriority = TaskPriority;

  constructor(
    private taskService: TaskService,
    public auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading = true;
    this.error = '';

    this.taskService.getAll().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.loading = false;
      },
      error: () => {
        this.error = 'Erreur lors du chargement des tâches';
        this.loading = false;
      }
    });
  }

  get filteredTasks(): Task[] {
    if (this.filterStatus === 'all') return this.tasks;
    return this.tasks.filter(t => t.status === this.filterStatus);
  }

  markAsDone(task: Task): void {
    const updated = {
      title: task.title,
      description: task.description,
      status: TaskStatus.Done,
      priority: task.priority,
      dueDate: task.dueDate
    };

    this.taskService.update(task.id, updated).subscribe({
      next: () => this.loadTasks(),
      error: () => this.error = 'Erreur lors de la mise à jour'
    });
  }

  deleteTask(id: string): void {
    if (!confirm('Supprimer cette tâche ?')) return;

    this.taskService.delete(id).subscribe({
      next: () => this.loadTasks(),
      error: () => this.error = 'Erreur lors de la suppression'
    });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  getStatusLabel(status: TaskStatus): string {
    switch (status) {
      case TaskStatus.Todo: return 'À faire';
      case TaskStatus.InProgress: return 'En cours';
      case TaskStatus.Done: return 'Terminée';
    }
  }

  getPriorityLabel(priority: TaskPriority): string {
    switch (priority) {
      case TaskPriority.Low: return 'Basse';
      case TaskPriority.Medium: return 'Moyenne';
      case TaskPriority.High: return 'Haute';
    }
  }

  getPriorityClass(priority: TaskPriority): string {
    switch (priority) {
      case TaskPriority.Low: return 'bg-secondary';
      case TaskPriority.Medium: return 'bg-info';
      case TaskPriority.High: return 'bg-danger';
    }
  }

  getStatusClass(status: TaskStatus): string {
    switch (status) {
      case TaskStatus.Todo: return 'bg-secondary';
      case TaskStatus.InProgress: return 'bg-warning text-dark';
      case TaskStatus.Done: return 'bg-success';
    }
  }
}