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
  monthlyExpensesSig = signal<Expense[]>([]);
  expensesSigLength = computed(() => this.monthlyExpensesSig().length ? this.monthlyExpensesSig().length : 0);
  expensesSigTotals = computed(() =>
    this.monthlyExpensesSig().length ? this.monthlyExpensesSig()?.map((value => value.valor))?.reduce(function (a, b) { return a + b }) : 0
  );

  expensesMonths = computed(() => { return [...new Set(this.monthlyExpensesSig().map((item) => new Date(item.data).getMonth()))] });
  yearsWithExpenses = signal<number[]>([])
  monthsWithExpenses = signal<number[]>([])

  constructor() {
  }

  create(expense: Expense): Observable<Expense> {
    console.log("save(): " + JSON.stringify(expense));

    return this.expensesApiService.create(expense);
  }

  getAllExpensesByYear(year: number) {
    this.expensesApiService.getAllExpensesByYear(year)
      .subscribe(value => {
        this._expenses.next(value),
          this.monthlyExpensesSig.set(value),
          this.showChangedValues(value)
      });
  }

  getAllExpensesByMonth(month: number, year: number) {
    this.expensesApiService.getAllExpensesByMonth(month, year)
      .subscribe(value => {
        this._expenses.next(value),
          this.monthlyExpensesSig.set(value),
          this.showChangedValues(value)
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

  private showChangedValues(values: Expense[]) {
    console.log("Changed values =================================");
    console.log("expensesSig length: " + this.expensesSigLength());
    console.log("expensesSig totals: " + this.expensesSigTotals());
    console.log("expensesMonths    : " + this.expensesMonths());
    // console.log(values);
  }


}
