import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BirthdayService } from '../backend/birthday.service';
import { Birthday } from '../birthdays.model';
import { CanDeactivateGuard } from '../auth/can-decativate-guard';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css'],
})
export class EditPersonComponent
  implements OnInit, OnDestroy, CanDeactivateGuard
{
  birthday: Birthday;
  saved: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private birthdayService: BirthdayService,
    public dialogRef: MatDialogRef<EditPersonComponent>
  ) {
    this.birthday = { ...data };
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this); // Ensure proper binding
  }

  ngOnInit(): void {
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
    this.saved = false;
  }

  ngOnDestroy(): void {
    document.removeEventListener(
      'visibilitychange',
      this.handleVisibilityChange
    );
  }

  handleVisibilityChange() {
    if (document.visibilityState === 'hidden') {
      this.dialogRef.close();
    }
  }

  onSubmit(): void {
    this.birthdayService.editBirthday(this.birthday).subscribe(() => {
      this.saved = true;
      this.dialogRef.close(this.birthday);
      window.location.reload();
    });
  }

  onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;

    if (target.files && target.files[0]) {
      const file = target.files[0];

      const reader = new FileReader();

      reader.onload = () => {
        this.birthday.image = reader.result as string;
      };

      reader.readAsDataURL(file);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onDelete(): void {
    this.birthdayService.deleteBirthday(this.birthday.id!).subscribe(() => {
      this.dialogRef.close({ deleted: true, id: this.birthday.id });
      window.location.reload();
    });
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.saved === false) {
      return confirm('Do you want to discard the changes?');
    }
    return true;
  }
}
