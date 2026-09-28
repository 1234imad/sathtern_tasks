import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StudentService } from '../../../core/services/student.service';
import {
  CreateStudentRequest,
  UpdateStudentRequest
} from '../../../core/models/student.model';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {
  isEdit = false;
  studentId: string | null = null;

  form: UpdateStudentRequest = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    major: '',
    gpa: 0
  };

  loading = false;
  error = '';

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

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.studentId = this.route.snapshot.paramMap.get('id');

    if (this.studentId) {
      this.isEdit = true;
      this.loadStudent(this.studentId);
    }
  }

  loadStudent(id: string): void {
    this.loading = true;
    this.studentService.getById(id).subscribe({
      next: (student) => {
        // Conversion Date ISO → yyyy-MM-dd pour <input type="date">
        const dateOnly = student.dateOfBirth
          ? student.dateOfBirth.substring(0, 10)
          : '';

        this.form = {
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email,
          phone: student.phone,
          dateOfBirth: dateOnly,
          address: student.address,
          major: student.major,
          gpa: student.gpa
        };
        this.loading = false;
      },
      error: () => {
        this.error = 'Étudiant introuvable';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    this.error = '';
    this.loading = true;

    // Conversion date yyyy-MM-dd → ISO UTC
    const payload = {
      ...this.form,
      dateOfBirth: this.form.dateOfBirth
        ? new Date(this.form.dateOfBirth).toISOString()
        : new Date().toISOString()
    };

    if (this.isEdit && this.studentId) {
      this.studentService.update(this.studentId, payload).subscribe({
        next: () => this.router.navigate(['/students']),
        error: (err) => {
          this.error = err.error?.message || 'Erreur lors de la modification';
          this.loading = false;
        }
      });
    } else {
      const createData: CreateStudentRequest = payload;
      this.studentService.create(createData).subscribe({
        next: () => this.router.navigate(['/students']),
        error: (err) => {
          this.error = err.error?.message || 'Erreur lors de la création';
          this.loading = false;
        }
      });
    }
  }
}