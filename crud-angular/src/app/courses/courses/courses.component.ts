import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { NotificationAlertService } from 'src/app/shared/components/notification-alert/notification-alert.service';
import { SnackbarCustomComponent } from '../../shared/components/snackbarcustom/snackbar.custom.component';
import { ICourses } from '../interfaces/ICourses';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'category', 'actions'];
  courses$: Observable<ICourses[]> | null = null;

  pageIndex = 0;
  pageSize = 5;
  pageLength = 100;
  totalElements = 0;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private notificationAlertService: NotificationAlertService
  ) {
    this.loadData();
  }

  async loadData(
    pageEvent: PageEvent = {
      length: 0,
      pageIndex: 0,
      pageSize: 5,
    }
  ) {
    this.courses$ = this.coursesService
      .listCourses(pageEvent.pageIndex, pageEvent.pageSize)
      .pipe(
        tap((result) => {
          this.dataSource = new MatTableDataSource(result);
          this.pageIndex = pageEvent.pageIndex;
          this.pageSize = pageEvent.pageSize;
          this.totalElements = result.totalElements;
          this.paginator.length = this.totalElements;
        }),
        catchError((_) => {
          this.onError('Erro ao carregar cursos.');
          return of([]);
        })
      );
    this.courses$.subscribe();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.cdr.detectChanges();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (filterValue.trim() == '') {
      this.loadData();
    }
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
      if (result == true) {
        this.coursesService.deleteCourses(course).subscribe(
          () => {
            this.onSuccess('Delete success');
            this.loadData();
          },
          () => this.onError('Error save courses!')
        );
      }
    });
  }

  onSuccess(message: string) {
    this.notificationAlertService.success(message);
  }
  onError(message: string) {
    this.notificationAlertService.error(message);
  }
}
