import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { StudentService } from '../../../core/services/student.service';
import { AuthService } from '../../../core/services/auth.service';
import { Student, StudentQuery } from '../../../core/models/student.model';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  // ============================
  // Données
  // ============================
  students: Student[] = [];
  loading = false;
  error = '';

  // ============================
  // Pagination
  // ============================
  page = 1;
  pageSize = 10;
  totalCount = 0;
  totalPages = 0;

  // ============================
  // Filtres
  // ============================
  search = '';
  major = '';
  sortBy = 'name';

  majors = [
    'Informatique',
    'Génie Logiciel',
    'Réseaux',
    'Mathématiques',
    'Physique',
    'Chimie',
    'Biologie',
    'Économie',
    'Gestion',
    'Droit'
  ];

  private searchSubject = new Subject<string>();

  constructor(
    private studentService: StudentService,
    public auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.page = 1;
        this.loadStudents();
      });

    this.loadStudents();
  }

  // ============================
  // Charger les étudiants
  // ============================
  loadStudents(): void {
    this.loading = true;
    this.error = '';

    const query: StudentQuery = {
      search: this.search || undefined,
      major: this.major || undefined,
      sortBy: this.sortBy || undefined,
      page: this.page,
      pageSize: this.pageSize
    };

    console.log('🔵 loadStudents appelé:', query);

    this.studentService.getAll(query).subscribe({
      next: (result) => {
        console.log('✅ Résultat:', result);

        if (!result) {
          this.students = [];
          this.totalCount = 0;
          this.totalPages = 0;
        } else {
          this.students = result.items ?? [];
          this.totalCount = result.totalCount ?? 0;
          this.totalPages = result.totalPages ?? 0;
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Erreur:', err);
        this.error = `Erreur ${err.status}: ${err.statusText || err.message}`;
        this.students = [];
        this.totalCount = 0;
        this.totalPages = 0;
        this.loading = false;
      }
    });
  }

  onSearchChange(value: string): void {
    this.search = value;
    this.searchSubject.next(value);
  }

  onFilterChange(): void {
    this.page = 1;
    this.loadStudents();
  }

  goToPage(p: number): void {
    if (p < 1 || p > this.totalPages) return;
    this.page = p;
    this.loadStudents();
  }

  nextPage(): void {
    this.goToPage(this.page + 1);
  }

  previousPage(): void {
    this.goToPage(this.page - 1);
  }

  deleteStudent(id: string): void {
    if (!confirm('Supprimer cet étudiant ?')) return;

    this.studentService.delete(id).subscribe({
      next: () => {
        if (this.students.length === 1 && this.page > 1) {
          this.page--;
        }
        this.loadStudents();
      },
      error: () => {
        this.error = 'Erreur lors de la suppression';
      }
    });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  getCurrentUser() {
    return this.auth.getCurrentUser();
  }
}