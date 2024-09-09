import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-snackbarcustom',
  templateUrl: './snackbarcustom.component.html',
  styleUrls: ['./snackbarcustom.component.scss']
})
export class SnackbarcustomComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}



}
