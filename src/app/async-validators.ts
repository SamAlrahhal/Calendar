// src/app/async-validators.ts
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AsyncValidators {
  constructor(private authService: AuthService) {}

  emailTaken(control: AbstractControl): Observable<ValidationErrors | null> {
    console.log('Validating email:', control.value);
    return this.authService.checkEmail(control.value).pipe(
      map((isTaken) => {
        if (isTaken) {
          console.log('Email is taken:', control.value);
          return { emailTaken: true };
        }
        console.log('Email is available:', control.value);
        return null;
      }),
      catchError((error) => {
        console.error('Error in emailTaken validator:', error);
        return of(null);
      })
    );
  }
}
