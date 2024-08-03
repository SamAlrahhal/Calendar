import { map, Observable, of } from 'rxjs';
import { Admin } from '../admin.model';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from './auth.service';
import { BirthdayService } from '../backend/birthday.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminGuardService implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private birthdayService: BirthdayService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.authService.getUid().pipe(
      switchMap((uid) => {
        if (uid) {
          return this.birthdayService.getAdmin(uid).pipe(
            map((admin) => {
              if (admin) {
                return true;
              } else {
                return false;
              }
            })
          );
        } else {
          return of(false);
        }
      })
    );
  }
}
