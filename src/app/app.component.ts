import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  people: any[] = [];
  birthdaysToday: any[] = [];
  birthdaysThisWeek: any[] = [];
  birthdaysThisMonth: any[] = [];
  title = 'Calendar';
}
