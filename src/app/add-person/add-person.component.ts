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
import { CanDeactivateGuard } from '../auth/can-decativate-guard';
import { Observable } from 'rxjs';
import { DiscardChangesDialogComponent } from '../discard-changes-dialog/discard-changes-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css'],
})
export class AddPersonComponent implements CanDeactivateGuard {
  imageFile!: File;
  firstName!: string;
  lastName!: string;
  birthdate!: string;
  phoneNumber!: string;

  saved: boolean = false;

  private storage = getStorage(initializeApp(environment.firebase));

  constructor(
    private birthdayService: BirthdayService,
    private dialog: MatDialog
  ) {}

  onSubmit() {
    this.saved = true;
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

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.saved === false) {
      const dialogRef = this.dialog.open(DiscardChangesDialogComponent);

      return dialogRef.afterClosed().toPromise();
    }
    return true;
  }

  private resetForm(): void {
    this.firstName = '';
    this.lastName = '';
    this.birthdate = '';
    this.phoneNumber = '';
    this.imageFile = null as any;
  }
}
