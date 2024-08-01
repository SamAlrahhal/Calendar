import { Component, OnInit } from '@angular/core';
import { BirthdayService } from '../backend/birthday.service';
import { Birthday } from '../birthdays.model';

@Component({
  selector: 'app-show-all',
  templateUrl: './show-all.component.html',
  styleUrls: ['./show-all.component.css'],
})
export class ShowAllComponent implements OnInit {
  birthdays: Birthday[] = [];

  constructor(private birthdayService: BirthdayService) {}

  ngOnInit(): void {
    this.getBirthdays();
  }

  getBirthdays(): void {
    this.birthdayService.getBirthdays().subscribe((birthdays: Birthday[]) => {
      this.birthdays = birthdays;
    });
  }
}
