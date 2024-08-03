import { Component, OnInit } from '@angular/core';
import { BirthdayService } from './backend/birthday.service';
import { Router } from '@angular/router';
import { Birthday } from './birthdays.model';
import { AuthService } from './auth/auth.service';

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
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

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

      // Check if birthday is today
      if (currentYearBirthday.toDateString() === todayStart.toDateString()) {
        this.birthdaysToday.push(birthday);
      }
      // Check if birthday is within this week
      else if (
        currentYearBirthday > todayStart &&
        currentYearBirthday <= oneWeekLater
      ) {
        this.birthdaysThisWeek.push(birthday);
      }
      // Check if birthday is within this month
      else if (
        currentYearBirthday > oneWeekLater &&
        currentYearBirthday <= endOfMonth
      ) {
        this.birthdaysThisMonth.push(birthday);
      }
    });
  }

  shouldShowBirthdays(): boolean {
    return ![
      '/show-all',
      '/add-person',
      '/signup',
      '/login',
      '/admin',
    ].includes(this.router.url);
  }
}
