import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-discard-changes-dialog',
  templateUrl: './discard-changes-dialog.component.html',
  styleUrls: ['./discard-changes-dialog.component.css'],
})
export class DiscardChangesDialogComponent {
  constructor(public dialogRef: MatDialogRef<DiscardChangesDialogComponent>) {}

  onDiscard(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
