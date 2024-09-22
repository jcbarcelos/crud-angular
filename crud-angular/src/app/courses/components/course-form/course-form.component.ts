import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  UntypedFormArray,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { NotificationAlertService } from 'src/app/shared/components/notification-alert/notification-alert.service';
import { ICategory } from '../../interfaces/iCategory';
import { ICourses } from '../../interfaces/ICourses';
import { ILesson } from '../../interfaces/ILesson';
import { CoursesService } from '../../services/courses.service';
import { BaseFormService } from '../../../shared/components/base-form/base-form.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  course!: ICourses;
  category: string = 'Front-End';
  form!: UntypedFormGroup;
  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    public dialog: MatDialog,
    private notificationAlertService: NotificationAlertService,
    public baseFormService: BaseFormService,
    private router: Router,
    private route: ActivatedRoute
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
    this.form = this.formBuilder.group({
      id: [this.course.id],
      name: [
        this.course.name,
        [
          Validators.required,
          Validators.maxLength(200),
          Validators.required,
          Validators.minLength(5),
        ],
      ],
      category: [this.course.category, Validators.required],
      lessons: this.formBuilder.array(
        this.retrieveLesson(this.course),
        Validators.required
      ),
    });
    this.category =
      this.course.category == 'BACKEND' ? 'Back-end' : 'Front-end';
  }

  private retrieveLesson(course: ICourses) {
    const lessons = [];
    if (course.lessons !== undefined && course.lessons.length > 0) {
      course.lessons.forEach((lesson) =>
        lessons.push(this.createLesson(lesson))
      );
    } else {
      lessons.push(this.createLesson());
    }

    return lessons;
  }
  getLessonsFromArray() {
    return (<UntypedFormArray>this.form.get('lessons')).controls;
  }
  private createLesson(
    lesson: ILesson = {
      id: 0,
      name: '',
      youtubeUrl: '',
    }
  ) {
    return this.formBuilder.group({
      id: [lesson.id],
      name: [
        lesson.name,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      youtubeUrl: [
        lesson.youtubeUrl,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(255),
        ],
      ],
    });
  }
  onAddLesson() {
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.push(this.createLesson());
  }
  onRemoveLesson(index: number) {
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.removeAt(index);
  }
  onSubmit() {
    if (this.form.valid) {
      if (this.course.id === '' || this.course.id === undefined) {
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
    } else {
      this.baseFormService.validateAllFormFields(this.form);
    }
  }

  onCancel() {
    this.router.navigate([''], { relativeTo: this.route });
  }
  showSuccess() {
    this.notificationAlertService.success('Operação realizada com sucesso!');
    this.form.reset();
  }
  showError(message: string) {
    this.notificationAlertService.error(message);
  }
}
