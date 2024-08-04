import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { BirthdaysComponent } from './birthdays/birthdays.component';
import { TaskbarComponent } from './taskbar/taskbar.component';
import { ShowAllComponent } from './show-all/show-all.component';
import { AddPersonComponent } from './add-person/add-person.component';
import { EditPersonComponent } from './edit-person/edit-person.component';
import { BirthdayService } from './backend/birthday.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AdminComponent } from './admin/admin.component';
import { ShowAllUsersComponent } from './admin/show-all-users/show-all-users.component';
import { ShowAllBirthdaysComponent } from './admin/show-all-birthdays/show-all-birthdays.component';

@NgModule({
  declarations: [
    AppComponent,
    BirthdaysComponent,
    TaskbarComponent,
    ShowAllComponent,
    AddPersonComponent,
    EditPersonComponent,
    LoginComponent,
    SignupComponent,
    AdminComponent,
    ShowAllUsersComponent,
    ShowAllBirthdaysComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    AppRoutingModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
  ],
  providers: [BirthdayService],
  bootstrap: [AppComponent],
})
export class AppModule {}
