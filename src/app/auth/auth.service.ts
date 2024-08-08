import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from '@angular/fire/auth';
import { BehaviorSubject, catchError, from, map, Observable, of } from 'rxjs';
import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string | null = null;
  private currentUserEmailSubject: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>(null);
  private currentUserEmail$: Observable<string | null> =
    this.currentUserEmailSubject.asObservable();

  private currentUserUidSubject: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>(null);
  private currentUserUid$: Observable<string | null> =
    this.currentUserUidSubject.asObservable();

  constructor(
    private auth: Auth,
    private router: Router,
    private firestore: Firestore
  ) {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      this.token = storedToken;
    }

    this.auth.onAuthStateChanged((user) => {
      this.currentUserEmailSubject.next(user ? user.email : null);
      this.currentUserUidSubject.next(user ? user.uid : null);
    });
  }

  signup(email: string, password: string): Promise<string> {
    console.log('Attempting to sign up:', email);
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        console.log('Sign up successful');
        return 'success';
      })
      .catch((error) => {
        console.error('Signup error:', error);
        if (error.code === 'auth/email-already-in-use') {
          console.log('Email already in use:', email);
          return 'Email is already in use';
        }
        return error.message;
      });
  }

  login(email: string, password: string): Promise<boolean> {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        this.auth.currentUser?.getIdToken().then((token: string) => {
          this.token = token;
          localStorage.setItem('token', token);
        });
        return true;
      })
      .catch((error) => {
        console.error('Login error: ', error);
        return false;
      });
  }

  logout() {
    this.auth.signOut();
    this.token = null;
    localStorage.removeItem('token');
    this.currentUserUidSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.token !== null;
  }

  getCurrentUserEmail(): Observable<string | null> {
    return this.currentUserEmail$;
  }

  getUid(): Observable<string | null> {
    return this.currentUserUid$;
  }
}
