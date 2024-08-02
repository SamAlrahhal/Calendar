import { Component, OnInit, OnDestroy } from '@angular/core';
import { BirthdayService } from '../backend/birthday.service';
import { Birthday } from '../birthdays.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-show-all',
  templateUrl: './show-all.component.html',
  styleUrls: ['./show-all.component.css'],
})
export class ShowAllComponent implements OnInit, OnDestroy {
  birthdays: Birthday[] = [];
  birthdayChangesSub!: Subscription;

  constructor(private birthdayService: BirthdayService) {}

  ngOnInit(): void {
    this.birthdays = [];
    this.onGetBirthdays();
  }

  ngOnDestroy(): void {
    if (this.birthdayChangesSub) {
      this.birthdayChangesSub.unsubscribe();
    }
  }

  onGetBirthdays(): void {
    this.birthdayChangesSub = this.birthdayService
      .getBirthdays()
      .subscribe((birthdays) => {
        this.birthdays = birthdays;
      });
  }
}
