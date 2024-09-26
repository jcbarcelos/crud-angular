import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BaseFormComponent } from './components/base-form/base-form.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { NotificationAlertComponent } from './components/notification-alert/notification-alert.component';
import { SnackbarCustomComponent } from './components/snackbarcustom/snackbar.custom.component';
import { CategoryPipe } from './pipes/category.pipe';

@NgModule({
  declarations: [
    SnackbarCustomComponent,
    CategoryPipe,
    ConfirmationDialogComponent,
    NotificationAlertComponent,
    BaseFormComponent,
  ],
  imports: [CommonModule],
  exports: [SnackbarCustomComponent, CategoryPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
