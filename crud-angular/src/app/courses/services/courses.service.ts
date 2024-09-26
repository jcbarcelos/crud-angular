import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';
import { ICourses } from '../interfaces/ICourses';
import { environment as prod } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { ICoursePage } from '../interfaces/ICoursePage';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly API =  prod.prod;

  constructor(private httpClient: HttpClient) {}

  listCourses(page: number, pageSize: number): Observable<any> {
    return this.httpClient.get<ICoursePage>(this.API, { params: {page, pageSize} }).pipe(first());
  }
  getByIdCourses(id: string) {
    return this.httpClient.get<ICourses>(`${this.API}/${id}`);
  }

  saveCourses(record: Partial<ICourses>) {
    console.log(record);

    if (record.id) {
      return this.updateCourses(record);
    }
    return this.create(record);
  }

  private updateCourses(record: Partial<ICourses>) {
    return this.httpClient
      .put<ICourses>(`${this.API}/${record.id}`, record)
      .pipe(first());
  }
  deleteCourses(id: string) {
    return this.httpClient
      .delete<ICourses>(`${this.API}/${id}`)
      .pipe(first());
  }

  private create(record: Partial<ICourses>) {
    return this.httpClient.post<ICourses>(`${this.API}`, record).pipe(first());
  }
}
