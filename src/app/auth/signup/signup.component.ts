import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../custom-validators';
import { AsyncValidators } from '../../async-validators';

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
    private fb: FormBuilder,
    private asyncValidators: AsyncValidators
  ) {
    this.signupForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.email],
        [this.asyncValidators.emailTaken.bind(this.asyncValidators)],
      ],
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
      return;
    }

    const email = this.signupForm.get('email')?.value;
    const password = this.signupForm.get('password')?.value;

    this.authService.signup(email, password).then((res) => {
      if (res === 'success') {
        this.router.navigate(['/login']);
      } else {
        this.errorMessage = res;
      }
    });
  }
}
