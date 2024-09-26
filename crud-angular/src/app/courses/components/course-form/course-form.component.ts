import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  UntypedFormArray,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { ActivatedRoute, Router } from '@angular/router';
import { NotificationAlertService } from 'src/app/shared/components/notification-alert/notification-alert.service';
import { BaseFormService } from '../../../shared/components/base-form/base-form.service';
import { ICategory } from '../../interfaces/iCategory';
import { ICourses } from '../../interfaces/ICourses';
import { ILesson } from '../../interfaces/ILesson';
import { CoursesService } from '../../services/courses.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgFor,
    JsonPipe,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,

  ],
})
export class CourseFormComponent implements OnInit {
  course!: ICourses;
  category: string = '';
  form!: UntypedFormGroup;
  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    public dialog: MatDialog,
    private notificationAlertService: NotificationAlertService,
    public baseFormService: BaseFormService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loadCourses();
  }
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
    this.loadCourses();
  }
  loadCourses() {
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
  }
  private retrieveLesson(course: ICourses) {
    const lessons = [];
    if (course.lessons !== undefined) {
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
      id: '',
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
      this.service.saveCourses(this.form.value).subscribe(
        () => {
          this.showSuccess();
          this.onCancel();
        },
        (_) => {
          console.log('error ao salvar');
          return this.showError('error ao salvar');
        }
      );
    } else {
      this.baseFormService.validateAllFormFields(this.form);
    }
  }

  onCancel() {
    this.router.navigate([''], { relativeTo: this.route });
  }

  showSuccess() {
    this.notificationAlertService.success('Operação realizada com sucesso!');
  }
  showError(message: string) {
    this.notificationAlertService.error(message);
  }
}
