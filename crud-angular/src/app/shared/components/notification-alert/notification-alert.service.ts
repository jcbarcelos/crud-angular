import { Injectable } from '@angular/core';

import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarRef,
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
  success(message: string, duration: number = 10000): void {
    this.showNotification(
      message,
      'check_circle',
      'success-snackbar',
      duration
    );
  }

  error(message: string, duration: number = 5000): void {
    this.showNotification(message, 'error', 'error-snackbar', duration);
  }

  private showNotification(
    message: string,
    icon: string,
    panelClass: string,
    duration: number
  ): void {
    const config: MatSnackBarConfig = {
      data: {
        message: message,
        icon: icon,
      },
      //duration: duration,
      panelClass: [panelClass],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    };

    const snackBarRef = this.snackBar.openFromComponent(
      NotificationAlertComponent,
      config
    );
    // Captura a ação de "Sim"
    snackBarRef.onAction().subscribe((result) => {
      console.log('Ação confirmada: ', result);
      //snackBarRef.dismissWithAction();
    });

    // Após o SnackBar ser fechado, verifica se foi fechado por uma ação
    snackBarRef.afterDismissed().subscribe((info) => {
      if (info.dismissedByAction) {
        console.log('Ação confirmada: Não');
        this.closeNotification();
      }

    });
  }
  closeNotification() {
    this.snackBar.dismiss();
  }
}
