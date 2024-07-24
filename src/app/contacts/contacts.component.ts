import { Component, OnDestroy, OnInit } from '@angular/core';
import { Contact } from '../contacts.model';
import { ContactService } from '../backend/contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  contactSub!: Subscription;
  constructor(public contactService: ContactService) {}

  ngOnInit(): void {
    this.contacts = [];
    this.onGetContacts();
  }

  ngOnDestroy(): void {
    if (this.contactSub) {
      this.contactSub.unsubscribe();
    }
  }

  onGetContacts() {
    this.contactSub = this.contactService
      .getContacts()
      .subscribe((contacts) => {
        console.log(contacts);
        this.contacts = contacts;
      });
  }
}
