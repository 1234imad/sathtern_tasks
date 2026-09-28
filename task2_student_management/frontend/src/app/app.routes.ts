import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'students', pathMatch: 'full' },

  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register.component').then(m => m.RegisterComponent)
  },

  {
    path: 'students',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./features/students/student-list/student-list.component').then(m => m.StudentListComponent)
  },
  {
    path: 'students/new',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./features/students/student-form/student-form.component').then(m => m.StudentFormComponent)
  },
  {
    path: 'students/:id/edit',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./features/students/student-form/student-form.component').then(m => m.StudentFormComponent)
  },

  { path: '**', redirectTo: 'students' }
];