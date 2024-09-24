import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';
import { ICourses } from '../interfaces/ICourses';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly API = environment.develop;

  constructor(private httpClient: HttpClient) {}

  listCourses(page: number, size: number): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.httpClient.get<ICourses[]>(this.API, { params });
  }
  getByIdCourses(id: string) {
    return this.httpClient.get<ICourses>(`${this.API}/${id}`);
  }

  saveCourses(record: Partial<ICourses>) {
    console.log(record.id);

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
