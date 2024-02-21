import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { User } from '../../shared/models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private router = inject(Router);

  AUTH_API = "http://localhost:8080/api/v1/login";
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  currentUserSig = signal<User | undefined | null>(undefined);
  isLoggedIn = computed(() => this.currentUserSig() ? true : false);

  constructor() {
    this.verifyOldAuthentication();
  }

  setUser(user: User) {
    this.setStorageData(user);
    this.currentUserSig.set(user);
  }

  getUser(): User | null {
    let user = this.getStorageData();
    if (user) {
      return user;
    }
    this.cleanStorage();
    return null;
  }

  getToken() {
    let user = this.getStorageData();
    if (user) {
      return user.token;
    }
    return null;
  }

  isExpired() {
    let user = this.getStorageData();
    if (user) {
      var expiration = new Date(user.expiration).toISOString();
      var now = new Date().toISOString();
      return expiration < now;
    }
    return true;
  }

  logout() {
    this.cleanStorage();
    this.router.navigate(['/']);
  }

  login(username: string, password: string): Observable<User> {
    return this.http.post<User>(
      this.AUTH_API,
      {
        "username": username,
        "password": password
      },
      this.httpOptions
    ).pipe(
      tap(response => this.setUser(response))
    );
  }

  private verifyOldAuthentication() {
    this.currentUserSig.set(this.getUser());
  }

  private getStorageData(): User | null {
    let storedUser = localStorage.getItem('msu');
    if (storedUser) {
      let currentUser = atob(storedUser);
      return JSON.parse(currentUser);
    }
    return null;
  }

  private setStorageData(user: User) {
    let toSave = btoa(JSON.stringify(user));
    localStorage.setItem('msu', toSave);
  }

  private cleanStorage() {
    localStorage.removeItem('msu');
    this.currentUserSig.set(null);
  }
}
