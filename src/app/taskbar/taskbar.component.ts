import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { BirthdayService } from '../backend/birthday.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.css'],
})
export class TaskbarComponent implements OnInit {
  isAdmin: boolean = false;

  constructor(
    private authService: AuthService,
    private birthdayService: BirthdayService
  ) {}

  ngOnInit() {
    this.authService
      .getUid()
      .pipe(
        switchMap((uid) => {
          if (uid) {
            return this.birthdayService.getAdmin(uid);
          } else {
            console.log('uid not found');
            return of(null);
          }
        })
      )
      .subscribe((admin) => {
        this.isAdmin = admin ? true : false;
        console.log(this.isAdmin);
      });
  }

  onLogout(): void {
    this.authService.logout();
  }

  get auth() {
    return this.authService;
  }

  get bday() {
    return this.birthdayService;
  }
}
