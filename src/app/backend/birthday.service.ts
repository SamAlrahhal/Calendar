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

  editBirthday(birthday: Birthday): Observable<void> {
    if (!birthday.id) {
      throw new Error('Birthday ID is required for updating');
    }
    const birthdayDoc = doc(
      this.firestore,
      `birthdays/${birthday.id}`
    ) as DocumentReference<Birthday>;
    return from(setDoc(birthdayDoc, birthday)).pipe(map(() => {}));
  }

  deleteBirthday(id: string): Observable<void> {
    const birthdayDoc = doc(
      this.firestore,
      `birthdays/${id}`
    ) as DocumentReference<Birthday>;
    return from(deleteDoc(birthdayDoc)).pipe(map(() => {}));
  }

  getBirthday(id: string): Observable<Birthday> {
    const birthdayDoc = doc(
      this.firestore,
      `birthdays/${id}`
    ) as DocumentReference<Birthday>;
    return from(getDoc(birthdayDoc)).pipe(
      map((snapshot) => {
        const data = snapshot.data();
        if (!data) {
          throw new Error('Birthday not found');
        }
        return { id: snapshot.id, ...data } as Birthday;
      })
    );
  }
}