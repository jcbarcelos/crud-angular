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
  getByIdCourses(id: string ) {
    return this.httpClient.get<ICourses>(`${this.API}/${id}`);
  }

  saveCourses(record: Partial<ICourses>) {
    return this.httpClient.post<ICourses>(this.API, record).pipe(first());
  }
}
