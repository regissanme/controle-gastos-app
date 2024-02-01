import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, Observable, take, tap } from 'rxjs';
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
  expensesSig = signal<Expense[]>([]);
  expensesSigLength = computed(() => this.expensesSig().length ? this.expensesSig().length : 0);
  expensesSigTotals = computed(() =>
    this.expensesSig().length ?
    this.expensesSig()?.map((value => value.valor))?.reduce(function (a, b) { return a + b }) :
    0
  );

  // private expenses$ = this.getAll();

  expenses = toSignal(this._expenses, { initialValue: [] as Expense[] });
  selectedExpense = signal<Expense>({} as Expense);

  totalExpensesValue = computed(() => {
    if (!this.expenses().length) {
      console.log("totalExpenses NOT computed...");
      return 0;
    }
    console.log("totalExpenses computed: length: ", this.expenses().length);
    return this.expenses()?.map((value => value.valor))?.reduce(function (a, b) { return a + b })

  }
  );

  constructor() {
    this.getAllExpenses();
  }


  // setSelectedExpense(expense: Expense) {
  //   this.selectedExpense.set(expense);
  //   this.updateTotals();
  //   console.log("set selected - updating total Expenses...");
  // }

  // updateTotals() {
  //   this.expenses$ = this.getAll();
  // }


  // getAll(): Observable<Expense[]> {
  //   let userId = this.authService.currentUserSig()?.id;
  //   console.log(`getAll(${userId}):`);

  //   return this.http.get<Expense[]>(
  //     this.API_URL + `/all/${userId}`,
  //     this.httpOptions
  //   );
  // }

  create(expense: Expense): Observable<Expense> {

    console.log("save(): " + JSON.stringify(expense));

    return this.http.post<Expense>(
      this.API_URL,
      JSON.stringify(expense),
      this.httpOptions,
    ).pipe(
      tap(
        value => this.getAllExpenses(),
      ),

    );
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
    // const url = `${this.API_URL}/delete/${entity.id}`;
    const url = `${this.API_URL}/${entity.id}`;
    return this.http.delete<Expense>(url).pipe(take(1));
  }

  loadById(id: number) {
    const url = `${this.API_URL}/${id}`;
    return this.http.get<Expense>(url).pipe(take(1));
  }

  getAllExpenses() {
    let userId = this.authService.currentUserSig()?.id;

    this.http.get<Expense[]>(this.API_URL + `/all/${userId}`)
      .pipe(take(1))
      .subscribe(value => {
        this._expenses.next(value),
          this.expensesSig.set(value),
          console.log("getAll expenses lenght: ", this.expenses().length),
          this.showChangedValues()
      });
  }



  showChangedValues() {
    console.log("show changed values");
    console.log("expensesSig length: " + this.expensesSigLength());
    console.log("expensesSig totals: " + this.expensesSigTotals());
  }


}
