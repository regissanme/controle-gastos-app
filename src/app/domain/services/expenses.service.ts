import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/auth/auth.service';
import { Expense } from '../models/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  API_URL = "http://localhost:8080/api/v1/despesa/all";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getAll(): Observable<Expense[]> {
    let userId = this.authService.currentUserSig()?.id;
    console.log(`getAll(${userId}):`);

    return this.http.get<Expense[]>(
      this.API_URL + `/${userId}`,
      this.httpOptions
    );
  }


}
