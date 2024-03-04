import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, take } from 'rxjs';
import { AuthService } from '../../core/auth/auth.service';
import { LoaderService } from '../../shared/services/loader.service';
import { Expense } from '../models/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpensesApiService {

  API_URL = "http://localhost:8080/api/v1/despesa";
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private loaderService = inject(LoaderService);

  constructor() { }

  create(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(this.API_URL, expense, this.httpOptions,);
  }

  update(entity: Expense): Observable<Expense> {
    let url = `${this.API_URL}/${entity.id}`;
    return this.http.put<Expense>(url, entity).pipe(take(1));
  }

  delete(entity: Expense) {
    let url = `${this.API_URL}/${entity.id}`;
    return this.http.delete<Expense>(url).pipe(take(1));
  }

  loadById(id: number): Observable<Expense> {
    let url = `${this.API_URL}/${id}`;
    return this.http.get<Expense>(url).pipe(take(1));
  }

  getAllExpensesByYear(year: number): Observable<Expense[]> {
    let url = this.API_URL + `/all/${this.getUserId()}/${year}`;
    const response = this.http.get<Expense[]>(url).pipe(take(1));
    return this.loaderService.showLoadingUntilCompleted(response);
  }

  getAllExpensesByMonth(month: number, year: number): Observable<Expense[]> {
    let url = this.API_URL + `/all/${this.getUserId()}/${year}/${month}`;
    const response = this.http.get<Expense[]>(url).pipe(take(1));
    return this.loaderService.showLoadingUntilCompleted(response);
  }

  getYearsWithExpensesFromUser(): Observable<number[]> {
    let url = this.API_URL + `/years/${this.getUserId()}`;
    return this.http.get<number[]>(url).pipe(take(1));
  }

  getMonthsWithExpensesFromUserAndYear(year: number): Observable<number[]> {
    let url = this.API_URL + `/months/${this.getUserId()}/${year}`;
    return this.http.get<number[]>(url).pipe(take(1));
  }

  private getUserId(): string | undefined {
    return this.authService.currentUserSig()?.id;
  }
}
