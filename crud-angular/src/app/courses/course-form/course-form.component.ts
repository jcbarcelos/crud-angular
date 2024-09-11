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

import { ICategory } from '../interfaces/iCategory';
import { CoursesService } from '../services/courses.service';
import { ICourses } from '../interfaces/ICourses';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  form = this.formBuilder.group({
    name: [''],
    category: [''],
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private location: Location
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
  ngOnInit(): void {}

  onSubmit() {
    this.service.saveCourses(this.form.value).subscribe(
      () => {
        this.onSuccess();
      },
      (_) => this.onError()
    );
  }

  onCancel() {
    this.location.back();
  }
  private onSuccess() {
    this.openSnackBar('Save courses success!', 'Voltar');
    this.form.reset();
  }
  private onError() {
    this.openSnackBar('Error save courses!', '');
  }
  openSnackBar(message: string, action: string) {
    this.dialog.open(SnackbarCustomComponent, {
      data: message,
    });
    this._snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
