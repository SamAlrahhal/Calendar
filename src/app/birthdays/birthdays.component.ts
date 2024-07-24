import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BirthdayService } from '../backend/birthday.service';
import { Subscription } from 'rxjs';
import { Birthday } from '../birthdays.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-birthdays',
  templateUrl: './birthdays.component.html',
  styleUrls: ['./birthdays.component.css'],
})
export class BirthdaysComponent implements OnInit, OnDestroy {
  @Input() person: any;
  birthdays: Birthday[] = [];
  birthdaySub!: Subscription;
  constructor(
    public birthdayService: BirthdayService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.birthdays = [];
    this.onGetBirthdays();
  }

  ngOnDestroy(): void {
    if (this.birthdaySub) {
      this.birthdaySub.unsubscribe();
    }
  }

  onGetBirthdays() {
    this.birthdaySub = this.birthdayService
      .getBirthdays()
      .subscribe((birthdays) => {
        console.log(birthdays);
        this.birthdays = birthdays;
      });
  }

  isShowAllRoute() {
    return this.router.url === '/show-all';
  }
}
