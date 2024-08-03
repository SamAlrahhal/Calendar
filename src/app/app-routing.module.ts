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

const routes: Routes = [
  {
    path: 'add-person',
    component: AddPersonComponent,
    canActivate: [AuthGuard],
  },
  { path: 'show-all', component: ShowAllComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [UnAuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [UnAuthGuard] },
  {
    path: 'admin',
    component: AdminComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
