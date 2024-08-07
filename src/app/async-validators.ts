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
    return this.authService.checkEmail(control.value).pipe(
      map((isTaken) => (isTaken ? { emailTaken: true } : null)),
      catchError(() => of(null))
    );
  }
}
