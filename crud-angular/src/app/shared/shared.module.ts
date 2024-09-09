import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { SnackbarcustomComponent } from './components/snackbarcustom/snackbarcustom.component';



@NgModule({
  declarations: [
    SnackbarcustomComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    SnackbarcustomComponent
  ],

})
export class SharedModule { }
