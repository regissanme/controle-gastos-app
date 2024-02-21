import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
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

  private _expenses = new BehaviorSubject<Expense[]>([]);
  monthlyExpensesSig = signal<Expense[]>([]);
  expensesSigLength = computed(() => this.monthlyExpensesSig().length ? this.monthlyExpensesSig().length : 0);
  expensesSigTotals = computed(() =>
    this.monthlyExpensesSig().length ? this.monthlyExpensesSig()?.map((value => value.valor))?.reduce(function (a, b) { return a + b }) : 0
  );

  constructor() {
  }

  create(expense: Expense): Observable<Expense> {

    console.log("save(): " + JSON.stringify(expense));

    return this.http.post<Expense>(
      this.API_URL,
      JSON.stringify(expense),
      this.httpOptions,
    )
  }

  save(entity: Expense) {
    if (entity.id) {
      return this.update(entity);
    } else {
      return this.createExpense(entity);
    }
  }

  private createExpense(entity: Expense) {
    return this.http.post<Expense>(this.API_URL, entity).pipe(take(1));
  }

  private update(entity: Expense) {
    const url = `${this.API_URL}/${entity.id}`;
    return this.http.put<Expense>(url, entity).pipe(take(1));
  }

  delete(entity: Expense) {
    const url = `${this.API_URL}/${entity.id}`;
    return this.http.delete<Expense>(url).pipe(take(1));
  }

  loadById(id: number) {
    const url = `${this.API_URL}/${id}`;
    return this.http.get<Expense>(url).pipe(take(1));
  }

  getAllExpenses(month: number, year: number) {
    let userId = this.authService.currentUserSig()?.id;

    this.http.get<Expense[]>(this.API_URL + `/all/${userId}/${year}`)
      .pipe(take(1))
      .subscribe(value => {
        this._expenses.next(value),
          this.monthlyExpensesSig.set(value),
          this.showChangedValues()
      });
  }



  showChangedValues() {
    console.log("Changed values =================================");
    console.log("expensesSig length: " + this.expensesSigLength());
    console.log("expensesSig totals: " + this.expensesSigTotals());
  }


}
