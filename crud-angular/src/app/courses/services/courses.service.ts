import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';
import { ICourses } from '../interfaces/ICourses';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly API = environment.develop;

  constructor(private httpClient: HttpClient) {}

  listCourses() {
    return this.httpClient.get<ICourses[]>(this.API).pipe(first());
  }
  getByIdCourses(id: string) {
    return this.httpClient.get<ICourses>(`${this.API}/${id}`);
  }

  saveCourses(record: Partial<ICourses>) {
    if (record.id) {
      return   this.updateCourses(record);
    }
    return this.create(record);
  }

  updateCourses(record: Partial<ICourses>) {
    return this.httpClient
      .put<ICourses>(`${this.API}/${record.id}`, record)
      ;
  }

  private create(record: Partial<ICourses>) {
    return this.httpClient.post<ICourses>(`${this.API}`, record).pipe(first());
  }
}
