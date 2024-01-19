import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseCategoryService {

  API_URL = "http://localhost:8080/api/v1/";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient,) { }

  getAll(): Observable<any> {

    return this.http.get(
      this.API_URL,
      this.httpOptions
    );
  }
}
