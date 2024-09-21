import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatSortModule,
    MatGridListModule

  ],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatSortModule,
    MatGridListModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MaterialModule {}
