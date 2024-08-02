import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BirthdayService } from '../backend/birthday.service';
import { Subscription } from 'rxjs';
import { Birthday } from '../birthdays.model';
import { Router, Event as RouterEvent, NavigationStart } from '@angular/router';
import { EditPersonComponent } from '../edit-person/edit-person.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-birthdays',
  templateUrl: './birthdays.component.html',
  styleUrls: ['./birthdays.component.css'],
})
export class BirthdaysComponent implements OnInit, OnDestroy {
  dialogRef: MatDialogRef<EditPersonComponent> | undefined;
  @Input() birthday!: Birthday;
  @Input() birthdays: Birthday[] = [];
  birthdaySub!: Subscription;

  constructor(
    public birthdayService: BirthdayService,
    private router: Router,
    public dialog: MatDialog
  ) {
    // Close any opened dialog when route changes
    this.router.events
      .pipe(
        filter((event: RouterEvent) => event instanceof NavigationStart),
        tap(() => this.dialog.closeAll())
      )
      .subscribe();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.birthdaySub) {
      this.birthdaySub.unsubscribe();
    }
    document.removeEventListener(
      'visibilitychange',
      this.handleVisibilityChange
    );
  }

  isShowAllRoute() {
    return this.router.url === '/show-all';
  }

  openEditDialog(birthday: Birthday): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }

    this.dialogRef = this.dialog.open(EditPersonComponent, {
      data: { ...birthday },
      panelClass: 'editDialog',
      closeOnNavigation: true,
    });

    this.dialogRef.backdropClick().subscribe(() => {
      this.dialogRef?.close();
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

    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  }

  handleVisibilityChange = () => {
    if (document.hidden) {
      this.dialogRef?.close();
    }
  };
}
