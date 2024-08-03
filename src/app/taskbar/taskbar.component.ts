import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { BirthdayService } from '../backend/birthday.service';

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
    const uid = this.authService.getUid();
    console.log(uid);
    if (uid) {
      this.birthdayService.getAdmin(uid).subscribe((admin) => {
        this.isAdmin = admin ? true : false;
        console.log(this.isAdmin);
      });
    } else {
      console.log('uid not found');
    }
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
