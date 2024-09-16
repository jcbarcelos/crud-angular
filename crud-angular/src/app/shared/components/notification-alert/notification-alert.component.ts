import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notification-alert',
  templateUrl: './notification-alert.component.html',
  styleUrls: ['./notification-alert.component.scss'],
})
export class NotificationAlertComponent{
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}
}
