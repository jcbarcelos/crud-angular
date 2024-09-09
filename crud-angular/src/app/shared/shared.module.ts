import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { SnackbarCustomComponent } from './components/snackbarcustom/snackbar.custom.component';
import { CategoryPipe } from './pipes/category.pipe';




@NgModule({
  declarations: [
    SnackbarCustomComponent,
    CategoryPipe
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
