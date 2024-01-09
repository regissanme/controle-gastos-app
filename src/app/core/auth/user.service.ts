import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Register } from '../../components/shared/models/register';

const AUTH_API = "http://localhost:8080/api/v1/users";

  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

@Injectable({
  providedIn: 'root'
})
export class UserService {



  constructor(private http: HttpClient) { }

  register(user: Register): Observable<any> {
    console.log("register(): user = ", JSON.stringify(user));
    return this.http.post(
      AUTH_API,
      JSON.stringify(user),
      httpOptions
    );
  }

}
