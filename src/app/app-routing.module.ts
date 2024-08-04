import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPersonComponent } from './add-person/add-person.component';
import { ShowAllComponent } from './show-all/show-all.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth-guard.service';
import { UnAuthGuard } from './auth/unauth-guard.service';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuardService } from './auth/admin-guard.service';
import { ShowAllBirthdaysComponent } from './admin/show-all-birthdays/show-all-birthdays.component';
import { ShowAllUsersComponent } from './admin/show-all-users/show-all-users.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuardService],
    children: [
      { path: 'birthdays', component: ShowAllBirthdaysComponent },
      { path: 'users', component: ShowAllUsersComponent },
    ],
  },
  {
    path: 'add-person',
    component: AddPersonComponent,
    canActivate: [AuthGuard],
  },
  { path: 'show-all', component: ShowAllComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [UnAuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [UnAuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
