import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CoursesService } from '../../services/courses.service';
import { ICourses } from '../../interfaces/ICourses';
import { CoursesListComponent } from './courses-list.component';

describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;

  beforeEach(() => {
    const matDialogStub = () => ({});
    const coursesServiceStub = () => ({});
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CoursesListComponent],
      providers: [
        { provide: MatDialog, useFactory: matDialogStub },
        { provide: CoursesService, useFactory: coursesServiceStub }
      ]
    });
    fixture = TestBed.createComponent(CoursesListComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`displayedColumns has default value`, () => {
    expect(component.displayedColumns).toEqual([`name`, `category`, `actions`]);
  });

  it(`courses has default value`, () => {
    expect(component.courses).toEqual([]);
  });
});
