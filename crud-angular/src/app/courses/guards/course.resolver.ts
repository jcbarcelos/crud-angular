import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ICourses } from '../interfaces/ICourses';
import { CoursesService } from '../services/courses.service';

@Injectable({
  providedIn: 'root',
})
export class CourseResolver  {
  constructor(private coursesService: CoursesService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    _: RouterStateSnapshot
  ): Observable<ICourses> {
    if (route.params && route.params['id']) {
      return this.coursesService.getByIdCourses(route.params['id']);
    }
    return of({
      id: '',
      name: '',
      category: '',
      status: '',
      lesson: [],
    });
  }
}
