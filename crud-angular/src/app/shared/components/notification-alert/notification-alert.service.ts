import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { NotificationAlertComponent } from './notification-alert.component';

@Injectable({
  providedIn: 'root',
})
export class NotificationAlertService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(message: string, isSuccess: boolean) {
    this.snackBar.openFromComponent(NotificationAlertComponent, {
      data: {
        message: message,
        icon: isSuccess ? 'check_circle' : 'error',
      },
      duration: 3000,
      panelClass: isSuccess ? 'success-snackbar' : 'error-snackbar',
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
