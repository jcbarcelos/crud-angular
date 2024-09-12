import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ICourses } from '../../interfaces/ICourses';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'category', 'actions'];
  @Input() courses: ICourses[] = [];
  dataSource: MatTableDataSource<ICourses>;

  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);

  constructor() {
    this.dataSource = new MatTableDataSource(this.courses);
    console.log( this.dataSource);

  }

  ngOnInit(): void {

  }

  onEdit(course: ICourses) {
    this.edit.emit(course);
  }
  onDelete(course: ICourses) {
    this.remove.emit(course);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();


  }

}
