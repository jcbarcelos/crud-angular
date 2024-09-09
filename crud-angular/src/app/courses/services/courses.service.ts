import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';
import { ICourses } from '../interfaces/ICourses';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly API = './assets/courses.json';

  constructor(private httpClient: HttpClient) {}

  listCourses() {
    return this.httpClient.get<ICourses[]>(this.API).pipe(first());
  }
}
