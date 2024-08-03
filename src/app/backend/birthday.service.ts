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
  where,
  Timestamp,
  docData,
} from '@angular/fire/firestore';
import { Observable, from, Subject, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Birthday } from '../birthdays.model';
import { AuthService } from '../auth/auth.service';
import { Admin } from '../admin.model';

@Injectable({
  providedIn: 'root',
})
export class BirthdayService {
  private birthdayChanges = new Subject<void>();

  constructor(private firestore: Firestore, private authService: AuthService) {}

  getBirthdays(): Observable<Birthday[]> {
    return this.authService.getCurrentUserEmail().pipe(
      switchMap((userEmail) => {
        if (!userEmail) {
          return of([]); // Handle not logged in or email not available
        }
        const birthdaysCollection = collection(
          this.firestore,
          'birthdays'
        ) as CollectionReference<Birthday>;
        const q = query(
          birthdaysCollection,
          where('belongsTo', '==', userEmail)
        );

        return collectionData<Birthday>(q, { idField: 'id' }).pipe(
          map((birthdays) =>
            birthdays.map((birthday) => ({
              ...birthday,
              birthdate: this.convertTimestamp(birthday.birthdate),
            }))
          )
        );
      })
    );
  }

  getBirthdayChanges(): Observable<void> {
    return this.birthdayChanges.asObservable();
  }

  editBirthday(birthday: Birthday): Observable<void> {
    if (!birthday.id) {
      throw new Error('Birthday ID is required for updating');
    }
    const birthdayDoc = doc(
      this.firestore,
      `birthdays/${birthday.id}`
    ) as DocumentReference<Birthday>;

    // Preserve the belongsTo field
    return from(getDoc(birthdayDoc)).pipe(
      switchMap((snapshot) => {
        const data = snapshot.data();
        if (!data) {
          throw new Error('Birthday not found');
        }
        const userEmail = this.authService.getCurrentUserEmail().pipe(
          map((email) => {
            if (!email) {
              throw new Error('User not logged in');
            }
            return email;
          })
        );
        return userEmail.pipe(
          switchMap((email) => {
            return setDoc(birthdayDoc, {
              ...data,
              ...birthday,
              belongsTo: email,
            }).then(() => {
              this.birthdayChanges.next();
            });
          })
        );
      })
    );
  }

  addBirthday(birthday: Birthday): Observable<void> {
    return this.authService.getCurrentUserEmail().pipe(
      switchMap((userEmail) => {
        if (!userEmail) {
          throw new Error('User not logged in');
        }
        const birthdaysCollection = collection(
          this.firestore,
          'birthdays'
        ) as CollectionReference<Birthday>;
        return from(
          addDoc(birthdaysCollection, { ...birthday, belongsTo: userEmail })
        ).pipe(
          map(() => {
            this.birthdayChanges.next();
          })
        );
      })
    );
  }

  deleteBirthday(id: string): Observable<void> {
    const birthdayDoc = doc(
      this.firestore,
      `birthdays/${id}`
    ) as DocumentReference<Birthday>;
    return from(deleteDoc(birthdayDoc)).pipe(
      map(() => {
        this.birthdayChanges.next();
      })
    );
  }

  private convertTimestamp(timestamp: any): Date {
    return timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;
  }

  getAdmin(uid: string | null) {
    console.log('getAdminStatus');
    return docData<Admin>(
      doc(this.firestore, `admin/` + uid) as DocumentReference<Admin>
    );
  }
}
