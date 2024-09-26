import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ICourses } from '../../interfaces/ICourses';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatTableModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
})
export class CoursesListComponent {
  @Input() courses: ICourses[] = [];
  @Input() dataSource = new MatTableDataSource<ICourses>();

  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);
  @Output() applyFilter = new EventEmitter(false);

  @Input() displayedColumns: string[] | undefined;
  @Input() paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.courses.map((course) => this.dataSource.data.push(course));
    console.log(this.dataSource.data);
  }

  onEdit(course: ICourses) {
    this.edit.emit(course);
  }
  onDelete(course: ICourses) {
    this.remove.emit(course);
  }
  onApplyFilter(event: any) {
    this.applyFilter.emit(event);
  }
  sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }
    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return this.compare(a.name, b.name, isAsc);
        case 'category':
          return this.compare(a.category, b.category, isAsc);
        case 'id':
          return this.compare(a.id, b.id, isAsc);
        default:
          return 0;
      }
    });
  }
  compare(a: string | number, b: string | number, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
