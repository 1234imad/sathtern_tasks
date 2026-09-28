import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  CreateStudentRequest,
  PaginatedResult,
  Student,
  StudentQuery,
  UpdateStudentRequest
} from '../models/student.model';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private readonly apiUrl = `${environment.apiUrl}/Students`;

  constructor(private http: HttpClient) {}

  // =========================================================
  // GET /api/Students?search=...&major=...&sortBy=...&page=1&pageSize=10
  // =========================================================
  getAll(query: StudentQuery): Observable<PaginatedResult<Student>> {
    let params = new HttpParams();

    if (query.search)   params = params.set('search', query.search);
    if (query.major)    params = params.set('major', query.major);
    if (query.sortBy)   params = params.set('sortBy', query.sortBy);

    params = params.set('page', (query.page ?? 1).toString());
    params = params.set('pageSize', (query.pageSize ?? 10).toString());

    return this.http.get<PaginatedResult<Student>>(this.apiUrl, { params });
  }

  // =========================================================
  // GET /api/Students/{id}
  // =========================================================
  getById(id: string): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`);
  }

  // =========================================================
  // POST /api/Students
  // =========================================================
  create(data: CreateStudentRequest): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, data);
  }

  // =========================================================
  // PUT /api/Students/{id}
  // =========================================================
  update(id: string, data: UpdateStudentRequest): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/${id}`, data);
  }

  // =========================================================
  // DELETE /api/Students/{id}
  // =========================================================
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}