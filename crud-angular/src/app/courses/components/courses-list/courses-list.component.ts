import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort, Sort } from '@angular/material/sort';

import { ICourses } from '../../interfaces/ICourses';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent implements AfterViewInit {
  @Input() courses: ICourses[] = [];
  @Input() dataSource = new MatTableDataSource<ICourses>();

  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);
  @Output() applyFilter = new EventEmitter(false);

  @Input() displayedColumns: string[] | undefined;
  @Input() paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {}


  ngAfterViewInit() {
    console.log(this.paginator);
    if (this.dataSource && this.paginator) {
      this.dataSource.paginator = this.paginator; // Conectando o paginador à fonte de dados
    }
  }

  async refresh() {}

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
