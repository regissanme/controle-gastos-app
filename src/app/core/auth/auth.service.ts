import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user';

const AUTH_API = "http://localhost:8080/api/v1/login";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  currentUserSig = signal<User | undefined | null>(undefined);
  isLoggedIn = computed(() => this.currentUserSig() ? true : false);

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  setUser(user: User) {
    localStorage.setItem('token', user.token);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSig.set(user);
  }

  getUser() {
    // JSON.parse(localStorage.getItem('user'))

    let storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.currentUserSig.set(JSON.parse(storedUser));
      return JSON.parse(storedUser);
    }
    this.currentUserSig.set(null);
    return null;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSig.set(null);
    this.router.navigate(['/']);
  }

  login(username: string, password: string): Observable<any> {
    console.log("login(): user = " + username + " pwd = " + password);
    return this.http.post(
      AUTH_API,
      {
        "username": username,
        "password": password
      },
      httpOptions
    );
  }
}
