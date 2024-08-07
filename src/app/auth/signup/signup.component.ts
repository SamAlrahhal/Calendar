import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSignup(form: NgForm) {
    if (form.invalid) {
      this.errorMessage = 'Please fill in all fields correctly.';
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    this.authService.signup(email, password).then((res) => {
      if (res === 'success') {
        this.router.navigate(['/login']);
      } else {
        this.errorMessage = res;
      }
    });
  }

  ngOnInit(): void {}
}
