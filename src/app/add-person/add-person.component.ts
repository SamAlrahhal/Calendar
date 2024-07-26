import { Component } from '@angular/core';
import { Birthday } from '../birthdays.model';
import { BirthdayService } from '../backend/birthday.service';
@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css'],
})
export class AddPersonComponent {
  id!: string;
  firstName!: string;
  LanstName!: string;
  birthdate!: Date;
  phoneNumber!: string;

  constructor(private birthdayService: BirthdayService) {}

  onSubmit() {
    const newPerson: Birthday = {
      id: this.id,
      firstName: this.firstName,
      lastName: this.LanstName,
      birthdate: this.birthdate,
      phoneNumber: this.phoneNumber,
    };

    // this.serversService.addPerson(newPerson).subscribe({
    //   next: (response: any) => {
    //     newPerson.birthdate = '';
    //     newPerson.image = '';
    //     newPerson.name = '';
    //     newPerson.phone = '';
    //   },
    //   error: (error: any) => {
    //     console.log('Error occurred: ', error);
    //   },
    //   complete: () => {
    //     console.log('Completed');
    //     window.location.reload();
    //   },
    // });
  }
  // changeImage(event: Event): void {
  //   const target = event.target as HTMLInputElement;

  //   if (target.files && target.files[0]) {
  //     const file = target.files[0];

  //     const reader = new FileReader();

  //     reader.onload = () => {
  //       this.image = reader.result as string;
  //     };

  //     reader.readAsDataURL(file);
  //   }
  // }
}
