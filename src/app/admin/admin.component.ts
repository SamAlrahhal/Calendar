import { Component, OnInit, OnDestroy } from '@angular/core';
import { BirthdayService } from '../backend/birthday.service';
import { Birthday } from '../birthdays.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit, OnDestroy {
  birthdays: Birthday[] = [];
  birthdayChangesSub!: Subscription;

  constructor(private birthdayService: BirthdayService) {}

  ngOnInit(): void {
    this.birthdays = [];
    this.onShowAllBirthdaays();
  }
  onShowAllBirthdaays(): void {
    this.birthdayChangesSub = this.birthdayService
      .showAllBirthdays()
      .subscribe((birthdays) => {
        this.birthdays = birthdays;
      });
  }

  ngOnDestroy(): void {
    if (this.birthdayChangesSub) {
      this.birthdayChangesSub.unsubscribe();
    }
  }
}
