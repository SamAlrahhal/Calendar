import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string | null = null;
  private currentUserEmailSubject: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>(null);
  private currentUserEmail$: Observable<string | null> =
    this.currentUserEmailSubject.asObservable();

  constructor(private auth: Auth, private router: Router) {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      this.token = storedToken;
    }

    this.auth.onAuthStateChanged((user) => {
      this.currentUserEmailSubject.next(user ? user.email : null);
    });
  }

  signup(email: string, password: string): Promise<string> {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(() => 'success')
      .catch((error) => {
        console.error('Signup error: ', error);
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
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return this.token !== null;
  }

  getCurrentUserEmail(): Observable<string | null> {
    return this.currentUserEmail$;
  }

  getUid() {
    if (this.auth.currentUser) {
      return this.auth.currentUser.uid;
    } else {
      return null;
    }
  }
}
