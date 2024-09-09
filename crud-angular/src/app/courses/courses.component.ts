import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ICourses } from './interfaces/ICourses';
import { CoursesService } from './services/courses.service';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarcustomComponent } from '../shared/components/snackbarcustom/snackbarcustom.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'category'];
  courses$: Observable<ICourses[]>;

  constructor(coursesService: CoursesService, public dialog: MatDialog) {
    this.courses$ = coursesService
      .listCourses()
      .pipe(catchError((error) => {
        console.error(error);
        this.openDialog('Error ao carregar cursos');
        return of([]);
      }));
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}



  openDialog(errorMsg: string) {
    this.dialog.open(SnackbarcustomComponent, {
      data: errorMsg
    });
  }

}
