import { AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AsyncValidators {
  constructor(private authService: AuthService) {}

  validateEmailFormat(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    console.log('Checking email format:', control.value);
    const email = control.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const domainPattern = /\.(com|to|be|net|org|edu|gov|mil|co\.[a-z]{2,})$/;

    if (!email.includes('.')) {
      console.log('Email does not contain a "." symbol:', email);
      return of({ noDot: true });
    }

    if (!emailPattern.test(email)) {
      console.log('Email is not a valid format:', email);
      return of({ invalidFormat: true });
    }

    if (!domainPattern.test(email)) {
      console.log('Email does not end with a valid domain:', email);
      return of({ invalidDomain: true });
    }

    return of(null);
  }
}
