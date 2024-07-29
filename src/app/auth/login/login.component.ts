import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(form: NgForm) {
    if (form.invalid) {
      this.errorMessage = 'Please fill in all fields correctly.';
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    this.authService.login(email, password).then((res) => {
      if (!res) {
        this.invalidLogin = true;
      } else {
        this.invalidLogin = false;
        this.router.navigate(['/']);
      }
    });
  }

  ngOnInit() {
    this.invalidLogin = false;
  }
}
