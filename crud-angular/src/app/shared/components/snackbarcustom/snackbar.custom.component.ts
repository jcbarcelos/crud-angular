import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-snackbar.custom',
  templateUrl: './snackbar.custom.component.html',
  styleUrls: ['./snackbar.custom.component.scss']
})
export class SnackbarCustomComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}



}
