import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { BirthdaysComponent } from './birthdays/birthdays.component';
import { TaskbarComponent } from './taskbar/taskbar.component';
import { ShowAllComponent } from './show-all/show-all.component';
import { AddPersonComponent } from './add-person/add-person.component';

@NgModule({
  declarations: [AppComponent, BirthdaysComponent, TaskbarComponent, ShowAllComponent, AddPersonComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
