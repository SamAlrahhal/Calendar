import { Component } from '@angular/core';
import { Birthday } from '../birthdays.model';
import { BirthdayService } from '../backend/birthday.service';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { initializeApp } from 'firebase/app';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css'],
})
export class AddPersonComponent {
  imageFile!: File;
  firstName!: string;
  lastName!: string;
  birthdate!: string;
  phoneNumber!: string;

  private storage = getStorage(initializeApp(environment.firebase));

  constructor(private birthdayService: BirthdayService) {}

  onSubmit() {
    const filePath = `images/${Date.now()}_${this.imageFile.name}`;
    const fileRef = ref(this.storage, filePath);
    const uploadTask = uploadBytesResumable(fileRef, this.imageFile);

    uploadTask.on(
      'state_changed',
      (snapshot) => {},
      (error) => {
        console.log('Error occurred: ', error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          const newBirthday: Birthday = {
            firstName: this.firstName,
            lastName: this.lastName,
            birthdate: new Date(this.birthdate),
            phoneNumber: this.phoneNumber,
            image: url,
          };

          this.birthdayService.addBirthday(newBirthday).subscribe({
            next: (response: any) => {
              this.resetForm();
            },
            error: (error: any) => {
              console.log('Error occurred: ', error);
            },
            complete: () => {
              console.log('Completed');
              window.location.reload();
            },
          });
        });
      }
    );
  }

  changeImage(event: Event): void {
    const target = event.target as HTMLInputElement;

    if (target.files && target.files[0]) {
      this.imageFile = target.files[0];
    }
  }

  private resetForm(): void {
    this.firstName = '';
    this.lastName = '';
    this.birthdate = '';
    this.phoneNumber = '';
    this.imageFile = null as any;
  }
}
