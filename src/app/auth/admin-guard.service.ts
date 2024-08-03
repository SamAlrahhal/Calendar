import { map, Observable } from 'rxjs';
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

export class AdminGuardService implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private birthdayService: BirthdayService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean>
    | UrlTree
    | Promise<boolean>
    | UrlTree
    | boolean
    | UrlTree {
    return this.birthdayService.getAdmin(this.authService.getUid()).pipe(
      map((admin) => {
        if (admin) {
          return true;
        } else {
          return false;
        }
      })
    );
  }
}
