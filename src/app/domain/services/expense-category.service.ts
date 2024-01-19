import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExpenseCategory } from '../models/expense-category';

@Injectable({
  providedIn: 'root'
})
export class ExpenseCategoryService {

  API_URL = "http://localhost:8080/api/v1/despesa/categoria";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient,) { }

  getAll(): Observable<ExpenseCategory[]> {

    return this.http.get<ExpenseCategory[]>(
      this.API_URL,
      this.httpOptions
    );
  }
}
