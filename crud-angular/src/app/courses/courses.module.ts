import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { CourseFormComponent } from './components/course-form/course-form.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CoursesRoutingModule } from './courses-routing.module';

@NgModule({
    imports: [
    CommonModule,
    CoursesRoutingModule,
    ReactiveFormsModule,
    CoursesListComponent, CourseFormComponent,
],
    exports: [CoursesListComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CoursesModule {}
