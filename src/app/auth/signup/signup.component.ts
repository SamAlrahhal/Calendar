import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import {
  forbiddenNameValidator,
  emailExistsValidator,
} from '../custom-validators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.email],
        [emailExistsValidator(this.authService)],
      ],
      password: [
        '',
        [Validators.required, forbiddenNameValidator(/password/i)],
      ],
    });
  }

  ngOnInit(): void {}

  onSignup(): void {
    if (this.signupForm.invalid) {
      this.errorMessage = 'Please fill in all fields correctly.';
      return;
    }

    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;

    this.authService.signup(email, password).then((res) => {
      if (res === 'success') {
        this.router.navigate(['/login']);
      } else {
        this.errorMessage = res;
      }
    });
  }
}
