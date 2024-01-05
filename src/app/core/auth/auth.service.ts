import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = "http://localhost:8080/api/v1/login";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  constructor(private http: HttpClient) { }

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
