import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CoursesService } from '../services/courses.service';
import { ICourses } from '../interfaces/ICourses';

@Injectable({
  providedIn: 'root',
})
export class CourseResolver  {
  constructor(private coursesService: CoursesService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ICourses> {
    if (route.params && route.params['id']) {
      return this.coursesService.getByIdCourses(route.params['id']);
    }
    return of({
      id: '',
      name: '',
      category: '',
      status: '',
    });
  }
}
