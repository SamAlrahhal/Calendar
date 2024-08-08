import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../custom-validators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          CustomValidators.passwordContainsNumber,
        ],
      ],
    });
  }

  ngOnInit(): void {}

  onSignup() {
    if (this.signupForm.invalid) {
      this.errorMessage = 'Please fill in all fields correctly.';
      console.log('Form is invalid:', this.signupForm);
      return;
    }

    const email = this.signupForm.get('email')?.value;
    const password = this.signupForm.get('password')?.value;

    console.log('Form is valid. Attempting to sign up with email:', email);

    this.authService.signup(email, password).then((res) => {
      if (res === 'success') {
        console.log('Sign up successful, navigating to login');
        this.router.navigate(['/login']);
      } else {
        console.log('Sign up failed:', res);
        this.errorMessage = res;
      }
    });
  }
}
