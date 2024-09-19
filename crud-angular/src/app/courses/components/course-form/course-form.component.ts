import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { NotificationAlertService } from 'src/app/shared/components/notification-alert/notification-alert.service';
import { ICategory } from '../../interfaces/iCategory';
import { ICourses } from '../../interfaces/ICourses';
import { CoursesService } from '../../services/courses.service';
import { ECategory } from '../../enums/ECategory.enum';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  course!: ICourses;
  category: string = 'Front-End';
  form = this.formBuilder.group({
    id: [''],
    name: [
      '',
      [
        Validators.required,
        Validators.maxLength(200),
        Validators.required,
        Validators.minLength(2),
      ],
    ],
    category: ['', Validators.required],
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
      _id: 0,
      name: 'Front-end',
    },
    {
      _id: 1,
      name: 'Back-end',
    },
  ];

  ngOnInit(): void {
    this.course = this.route.snapshot.data['course'];
    this.form.patchValue({
      id: this.course.id,
      name: this.course.name,
      category: this.course.category == 'BACKEND' ? 'Back-end' : 'Front-end',
    });
    this.category =
      this.course.category == 'BACKEND' ? 'Back-end' : 'Front-end';
  }

  getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);

    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }
    if (field?.hasError('maxlength')) {
      const requiredLength: number = field.errors
        ? field.errors['maxlength']['requiredLength']
        : 200;
      return `Campo deve ter no máximo de ${requiredLength} `;
    }
    if (field?.hasError('minlength')) {
      const requiredLength: number = field.errors
        ? field.errors['minlength']['requiredLength']
        : 5;
      return `Campo deve ter no mínimo de ${requiredLength} `;
    }
    return field;
  }

  onSubmit() {
    if (this.course.id.toString() == '') {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: 'Salvo com sucesso, deseja continuar cadastrando?',
      });
      dialogRef.afterClosed().subscribe((result: boolean) => {
        if (result) {
          this.service.saveCourses(this.form.value).subscribe(
            () => {
              this.showSuccess();
            },
            (_) => {
              console.log('error ao salvar');

              return this.showError('error ao salvar');
            }
          );
        } else {
          this.service.saveCourses(this.form.value).subscribe(
            () => {
              this.showSuccess();
            },
            (error) => {
              console.log(error['error']['errors'][0]['codes']);

              return this.showError(error);
            }
          );
          this.onCancel();
        }
      });
    } else {
      this.service.saveCourses(this.form.value).subscribe(
        () => {
          this.showSuccess();
          this.onCancel();
        },
        (error) => {
          console.log(error['error']['errors'][0]['codes']);

          return this.showError(error['error']['errors'][0]['codes']);
        }
      );
    }
  }

  onCancel() {
    this.location.back();
  }

  showSuccess() {
    this.notificationAlertService.success('Operação realizada com sucesso!');
    this.form.reset();
  }
  showError(message: string) {
    this.notificationAlertService.error(message);
  }
}
