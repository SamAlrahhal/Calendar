import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { DiscardChangesDialogComponent } from './discard-changes-dialog.component';

@NgModule({
  declarations: [DiscardChangesDialogComponent],
  imports: [CommonModule, MatDialogModule],
  entryComponents: [DiscardChangesDialogComponent], // Required to load dialogs dynamically
})
export class DialogModule {}
