import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  CollectionReference,
  collectionData,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  DocumentReference,
  addDoc,
  query,
} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contact } from '../contacts.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contacts: Contact[] = [
    {
      id: '0',
      lastName: 'lastname',
      firstName: 'firstname',
      phoneNr: '01234546789',
    },
    {
      id: '1',
      lastName: 'testContact2',
      firstName: 'firstname',
      phoneNr: '0987654321',
    },
  ];
  constructor(private firestore: Firestore) {}

  getContacts(): Observable<Contact[]> {
    return collectionData<Contact>(
      collection(this.firestore, 'contacts') as CollectionReference<Contact>,
      { idField: 'id' }
    );
  }
}
