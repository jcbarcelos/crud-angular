import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { SnackbarCustomComponent } from './components/snackbarcustom/snackbar.custom.component';
import { CategoryPipe } from './pipes/category.pipe';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';




@NgModule({
  declarations: [
    SnackbarCustomComponent,
    CategoryPipe,
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    SnackbarCustomComponent,
    CategoryPipe
  ],

})
export class SharedModule { }
