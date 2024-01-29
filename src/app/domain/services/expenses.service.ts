import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../../core/auth/auth.service';
import { Expense } from '../models/expense';
@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  private http = inject(HttpClient);
  private authService = inject(AuthService);

  API_URL = "http://localhost:8080/api/v1/despesa";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }


  private expenses$ = this.getAll();

  expenses = toSignal(this.expenses$, { initialValue: [] as Expense[] });
  selectedExpense = signal<Expense>({} as Expense);

  totalExpensesValue = computed(() => {
    if (this.expenses().length) {

      return this.expenses()?.map((value => value.valor))?.reduce(function (a, b) { return a + b })
    } else {
      return 0;
    }
  }
  );


  setSelectedExpense(expense: Expense) {
    this.selectedExpense.set(expense);
    this.updateTotals();
    console.log("set selected - total Expenses : " + this.totalExpensesValue());
  }


  getAll(): Observable<Expense[]> {
    let userId = this.authService.currentUserSig()?.id;
    console.log(`getAll(${userId}):`);

    return this.http.get<Expense[]>(
      this.API_URL + `/all/${userId}`,
      this.httpOptions
    );
  }

  create(expense: Expense): Observable<Expense> {

    console.log("save(): " + JSON.stringify(expense));

    return this.http.post<Expense>(
      this.API_URL,
      JSON.stringify(expense),
      this.httpOptions,
    ).pipe(
      tap(
        value => this.setSelectedExpense(value),
      ),

    );
  }

  updateTotals() {
    this.expenses$ = this.getAll();
  }


}
