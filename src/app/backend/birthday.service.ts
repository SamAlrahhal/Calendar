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
import { Birthday } from '../birthdays.model';
@Injectable({
  providedIn: 'root',
})
export class BirthdayService {
  birthdays: Birthday[] = [];
  constructor(private firestore: Firestore) {}

  getBirthdays(): Observable<Birthday[]> {
    return collectionData<Birthday>(
      collection(this.firestore, 'birthdays') as CollectionReference<Birthday>,
      { idField: 'id' }
    );
  }
}
