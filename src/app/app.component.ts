import { Component, OnInit } from '@angular/core';
import { BirthdayService } from './backend/birthday.service';
import { Router } from '@angular/router'; // Import the Router
import { Birthday } from './birthdays.model'; // Import the Birthday model

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
  ) {} // Inject the Router

  ngOnInit() {
    this.birthdayService.getBirthdays().subscribe((data) => {
      this.birthdays = data;
      this.categorizeBirthdays();
    });
  }

  categorizeBirthdays() {
    const today = new Date();
    const oneWeekLater = new Date();
    oneWeekLater.setDate(today.getDate() + 7);

    this.birthdaysToday = [];
    this.birthdaysThisWeek = [];
    this.birthdaysThisMonth = [];

    this.birthdays.forEach((birthday) => {
      const birthdate = new Date(birthday.birthdate);
      const currentYearBirthday = new Date(
        today.getFullYear(),
        birthdate.getMonth(),
        birthdate.getDate()
      );

      if (currentYearBirthday >= today) {
        // Check if birthday is today or in the future
        if (currentYearBirthday.toDateString() === today.toDateString()) {
          this.birthdaysToday.push(birthday);
        } else if (currentYearBirthday <= oneWeekLater) {
          this.birthdaysThisWeek.push(birthday);
        } else if (currentYearBirthday.getMonth() === today.getMonth()) {
          this.birthdaysThisMonth.push(birthday);
        }
      }
    });

    console.log(this.router.url);
  }

  // Create a helper method to check if you're not on certain routes
  shouldShowBirthdays(): boolean {
    return !['/show-all', '/add-person'].includes(this.router.url);
  }
}
