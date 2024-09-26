import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Component, inject, Inject, ViewEncapsulation } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

@Component({
    selector: 'app-notification-alert',
    templateUrl: './notification-alert.component.html',
    styleUrls: ['./notification-alert.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NotificationAlertComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}
  snackBarRef = inject(MatSnackBarRef);

  confirm() {
    this.snackBarRef?.dismissWithAction(); // Dispara a ação e fecha o SnackBar
  }

  // Método chamado ao clicar no botão "Não"
  cancel() {
    this.snackBarRef?.dismiss(); // Fecha o SnackBar sem acionar a ação
  }
}
