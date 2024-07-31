import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPersonComponent } from './add-person/add-person.component';
import { ShowAllComponent } from './show-all/show-all.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth-guard.service';
import { RedirectComponent } from './auth/redirect/redirect.component';

const routes: Routes = [
  { path: '', component: RedirectComponent },
  {
    path: 'add-person',
    component: AddPersonComponent,
    canActivate: [AuthGuard],
  },
  { path: 'show-all', component: ShowAllComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
