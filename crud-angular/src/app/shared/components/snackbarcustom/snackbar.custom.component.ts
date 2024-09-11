import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-snackbar.custom',
  templateUrl: './snackbar.custom.component.html',
  styleUrls: ['./snackbar.custom.component.scss'],
})
export class SnackbarCustomComponent {
  constructor(
    public dialogRef: MatDialogRef<SnackbarCustomComponent>,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: {},
    @Inject(MAT_DIALOG_DATA)  public title: String,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  onGoBack(): void {
    this.router.navigate(['/'], { relativeTo: this.route });
    this.dialogRef.close();
  }
}
