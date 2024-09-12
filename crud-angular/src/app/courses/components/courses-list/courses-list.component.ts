import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ICourses } from '../../interfaces/ICourses';

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

  constructor() {}

  ngOnInit(): void {}

  onEdit(course: ICourses) {
    this.edit.emit(course);
  }
  onDelete(course: ICourses) {
    this.remove.emit(course);
  }
}
