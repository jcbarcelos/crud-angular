import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-snackbar.custom',
  templateUrl: './snackbar.custom.component.html',
  styleUrls: ['./snackbar.custom.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,

  ],
})
export class SnackbarCustomComponent {
  constructor(
    public dialogRef: MatDialogRef<SnackbarCustomComponent>,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: {},
    @Inject(MAT_DIALOG_DATA) public title: string
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  onGoBack(): void {
    this.router.navigate(['/'], { relativeTo: this.route });
    this.dialogRef.close();
  }
}
