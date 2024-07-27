import { Component, OnInit } from '@angular/core';
import { BirthdayService } from './backend/birthday.service';
import { Router } from '@angular/router';
import { Birthday } from './birthdays.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  birthdays: Birthday[] = [];
  birthdaysToday: Birthday[] = [];
  birthdaysThisWeek: Birthday[] = [];
  birthdaysThisMonth: Birthday[] = [];

  constructor(
    private birthdayService: BirthdayService,
    private router: Router
  ) {}

  ngOnInit() {
    this.birthdayService.getBirthdays().subscribe((data) => {
      this.birthdays = data;
      this.categorizeBirthdays();
    });
  }

  categorizeBirthdays() {
    const today = new Date();
    const todayStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const oneWeekLater = new Date(todayStart);
    oneWeekLater.setDate(todayStart.getDate() + 7);
    const endOfMonth = new Date(
      todayStart.getFullYear(),
      todayStart.getMonth() + 1,
      0
    );

    this.birthdaysToday = [];
    this.birthdaysThisWeek = [];
    this.birthdaysThisMonth = [];

    this.birthdays.forEach((birthday) => {
      const birthdate = new Date(birthday.birthdate);
      const currentYearBirthday = new Date(
        todayStart.getFullYear(),
        birthdate.getMonth(),
        birthdate.getDate()
      );

      if (currentYearBirthday >= todayStart) {
        // Check if birthday is today or in the future
        if (currentYearBirthday.toDateString() === todayStart.toDateString()) {
          this.birthdaysToday.push(birthday);
        } else if (
          currentYearBirthday >= todayStart &&
          currentYearBirthday <= oneWeekLater
        ) {
          this.birthdaysThisWeek.push(birthday);
        } else if (
          currentYearBirthday >= todayStart &&
          currentYearBirthday <= endOfMonth
        ) {
          this.birthdaysThisMonth.push(birthday);
        }
      }
    });

    console.log(this.router.url);
  }

  shouldShowBirthdays(): boolean {
    return !['/show-all', '/add-person'].includes(this.router.url);
  }
}
