import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { SnackbarCustomComponent } from 'src/app/shared/components/snackbarcustom/snackbar.custom.component';

import { ICategory } from '../../interfaces/iCategory';
import { CoursesService } from '../../services/courses.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ICourses } from '../../interfaces/ICourses';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { NotificationAlertComponent } from 'src/app/shared/components/notification-alert/notification-alert.component';
import { NotificationAlertService } from 'src/app/shared/components/notification-alert/notification-alert.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  form = this.formBuilder.group({
    id: [''],
    name: [''],
    category: [''],
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    public dialog: MatDialog,
    private location: Location,
    private route: ActivatedRoute,
    private notificationAlertService: NotificationAlertService
  ) {}

  categories: ICategory[] = [
    {
      _id: '',
      name: '',
    },
    {
      _id: '1',
      name: 'Front-End',
    },
    {
      _id: '2',
      name: 'Back-End',
    },
  ];
  ngOnInit(): void {
    const course: ICourses = this.route.snapshot.data['course'];
    this.form.patchValue({
      id: course.id,
      name: course.name,
      category: course.category,
    });
  }

  onSubmit() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Salvo com sucesso, deseja continuar cadastrando?',
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.service.saveCourses(this.form.value).subscribe(
          () => {
            this.onSuccess();
          },
          (_) => this.onError()
        );
      }
    });
  }

  onCancel() {
    this.location.back();
  }
  private onSuccess() {
    this.showSuccess();
    this.form.reset();
  }
  private onError() {
    this.showError();
  }
  showSuccess() {
    this.notificationAlertService.openSnackBar(
      'Operação realizada com sucesso!',
      true
    );
  }

  showError() {
    this.notificationAlertService.openSnackBar(
      'Falha ao realizar a operação!',
      false
    );
  }
}
