import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SnackbarCustomComponent } from '../../shared/components/snackbarcustom/snackbar.custom.component';
import { ICourses } from '../interfaces/ICourses';
import { CoursesService } from '../services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  displayedColumns: string[] = ['name', 'category', 'actions'];
  courses$: Observable<ICourses[]>;

  constructor(
    coursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.courses$ = coursesService.listCourses().pipe(
      catchError((error) => {
        console.error(error);
        this.openDialog('Error ao carregar cursos');
        return of([]);
      })
    );
  }

  openDialog(errorMsg: string) {
    this.dialog.open(SnackbarCustomComponent, {
      data: errorMsg,
    });
  }
  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
  onEdit(course: any) {
    console.log('edit', course);
  }
  onDelete(course: any) { console.log('delete', course);}
}
