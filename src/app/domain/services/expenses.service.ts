import { Injectable, computed, inject, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Expense } from '../models/expense';
import { ExpensesApiService } from './expenses-api.service';
@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  private expensesApiService = inject(ExpensesApiService);

  _expenses = new BehaviorSubject<Expense[]>([]);
  ExpensesSig = signal<Expense[]>([]);
  expensesSigLength = computed(() => this.ExpensesSig().length ?? 0);
  expensesSigTotals = computed(() =>
    this.ExpensesSig().length ? this.ExpensesSig()?.map((e => e.valor))?.reduce(function (a, b) { return a + b }) : 0
  );
  yearsWithExpenses = signal<number[]>([]);
  monthsWithExpenses = signal<number[]>([]);

  constructor() {
  }

  create(expense: Expense): Observable<Expense> {
    return this.expensesApiService.create(expense);
  }

  getAllExpensesByYear(year: number) {
    this.expensesApiService.getAllExpensesByYear(year)
      .subscribe(value => {
        this._expenses.next(value),
          this.ExpensesSig.set(value)
      });
  }

  getAllExpensesByMonth(month: number, year: number) {
    this.expensesApiService.getAllExpensesByMonth(month, year)
      .subscribe(value => {
        this._expenses.next(value),
          this.ExpensesSig.set(value)
      });
  }

  findYearsAndMonths(year: number) {
    this.getYearsWithExpensesFromUser();
    this.getMonthsWithExpensesFromUserAndYear(year);
  }

  getYearsWithExpensesFromUser() {
    this.expensesApiService.getYearsWithExpensesFromUser()
      .subscribe(values => {
        this.yearsWithExpenses.set(values);
      });
  }

  getMonthsWithExpensesFromUserAndYear(year: number) {
    this.expensesApiService.getMonthsWithExpensesFromUserAndYear(year)
      .subscribe(values => {
        this.monthsWithExpenses.set(values);
      });
  }

}
