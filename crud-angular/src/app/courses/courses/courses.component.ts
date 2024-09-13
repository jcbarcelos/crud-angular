import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SnackbarCustomComponent } from '../../shared/components/snackbarcustom/snackbar.custom.component';
import { ICourses } from '../interfaces/ICourses';
import { CoursesService } from '../services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { NotificationAlertService } from 'src/app/shared/components/notification-alert/notification-alert.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  displayedColumns: string[] = ['name', 'category', 'actions'];
  courses$: Observable<ICourses[]> | undefined;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private notificationAlertService: NotificationAlertService
  ) {
    this.refresh();
  }
  refresh() {
    this.courses$ = this.coursesService.listCourses().pipe(
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
    this.router.navigate(['edit', course.id], { relativeTo: this.route });
  }
  onDelete(course: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse curso',
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      console.log('The dialog was closed');
      if (result) {
        this.coursesService.deleteCourses(course).subscribe(
          () => {
            this.onSuccess('Delete success');
          },
          () => this.onError('Error save courses!')
        );
      }
    });
  }

  onSuccess(message: string) {
    this.notificationAlertService.openSnackBar(message, true);
    this.refresh();
  }
  onError(message: string) {
    this.notificationAlertService.openSnackBar(message, false);
  }
}
