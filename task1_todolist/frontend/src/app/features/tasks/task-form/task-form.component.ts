import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TaskService } from '../../../core/services/task.service';
import {
  CreateTaskRequest,
  TaskPriority,
  TaskStatus,
  UpdateTaskRequest
} from '../../../core/models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  isEdit = false;
  taskId: string | null = null;

  form: UpdateTaskRequest = {
    title: '',
    description: '',
    status: TaskStatus.Todo,
    priority: TaskPriority.Medium,
    dueDate: undefined
  };

  loading = false;
  error = '';

  TaskStatus = TaskStatus;
  TaskPriority = TaskPriority;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('id');

    if (this.taskId) {
      this.isEdit = true;
      this.loadTask(this.taskId);
    }
  }

  loadTask(id: string): void {
    this.loading = true;
    this.taskService.getById(id).subscribe({
      next: (task) => {
        this.form = {
          title: task.title,
          description: task.description ?? '',
          status: task.status,
          priority: task.priority,
          dueDate: task.dueDate
        };
        this.loading = false;
      },
      error: () => {
        this.error = 'Tâche introuvable';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    this.error = '';
    this.loading = true;

    if (this.isEdit && this.taskId) {
      this.taskService.update(this.taskId, this.form).subscribe({
        next: () => this.router.navigate(['/tasks']),
        error: () => {
          this.error = 'Erreur lors de la modification';
          this.loading = false;
        }
      });
    } else {
      const createData: CreateTaskRequest = {
        title: this.form.title,
        description: this.form.description,
        priority: this.form.priority,
        dueDate: this.form.dueDate
      };

      this.taskService.create(createData).subscribe({
        next: () => this.router.navigate(['/tasks']),
        error: () => {
          this.error = 'Erreur lors de la création';
          this.loading = false;
        }
      });
    }
  }
}