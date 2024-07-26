import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditPersonComponent } from '../edit-person/edit-person.component';
import { BirthdayService } from '../backend/birthday.service';
import { Birthday } from '../birthdays.model';

@Component({
  selector: 'app-show-all',
  templateUrl: './show-all.component.html',
  styleUrls: ['./show-all.component.css'],
})
export class ShowAllComponent implements OnInit {
  birthdays: Birthday[] = [];
  dialogRef: MatDialogRef<EditPersonComponent> | undefined;

  constructor(
    public dialog: MatDialog,
    private birthdayService: BirthdayService
  ) {}

  ngOnInit(): void {
    this.getBirthdays();
  }

  getBirthdays(): void {
    this.birthdayService.getBirthdays().subscribe((birthdays: Birthday[]) => {
      this.birthdays = birthdays;
    });
  }

  openEditDialog(birthday: Birthday): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }

    this.dialogRef = this.dialog.open(EditPersonComponent, {
      data: { ...birthday },
      panelClass: 'editDialog',
    });

    this.dialogRef.afterClosed().subscribe((updatedBirthday: Birthday) => {
      if (updatedBirthday) {
        this.birthdayService.editBirthday(updatedBirthday).subscribe(() => {
          const index = this.birthdays.findIndex(
            (b) => b.id === updatedBirthday.id
          );
          if (index !== -1) {
            this.birthdays[index] = updatedBirthday;
          }
        });
      }
    });
  }
}
