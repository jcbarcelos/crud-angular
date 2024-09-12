import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CoursesService } from '../services/courses.service';
import { ICourses } from '../interfaces/ICourses';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'category', 'actions'];
  @Input() courses: ICourses[] = [];
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);

  constructor(
    public coursesService: CoursesService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}
  onEdit(course: ICourses) {
    this.edit.emit(course);
  }
  onDelete(course: ICourses) {
    this.remove.emit(course);
  }
}
