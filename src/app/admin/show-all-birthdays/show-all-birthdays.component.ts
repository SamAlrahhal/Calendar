import { Component, OnInit, OnDestroy } from '@angular/core';
import { BirthdayService } from '../../backend/birthday.service';
import { Birthday } from '../../birthdays.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-show-all-birthdays',
  templateUrl: './show-all-birthdays.component.html',
  styleUrls: ['./show-all-birthdays.component.css'],
})
export class ShowAllBirthdaysComponent implements OnInit, OnDestroy {
  birthdays: Birthday[] = [];
  birthdayChangesSub!: Subscription;

  constructor(private birthdayService: BirthdayService) {}

  ngOnInit(): void {
    this.birthdays = [];
    this.onGetAllBirthdays();
  }

  ngOnDestroy(): void {
    if (this.birthdayChangesSub) {
      this.birthdayChangesSub.unsubscribe();
    }
  }

  onGetAllBirthdays(): void {
    this.birthdayChangesSub = this.birthdayService
      .showAllBirthdays()
      .subscribe((birthdays) => {
        this.birthdays = birthdays;
      });
  }
}
