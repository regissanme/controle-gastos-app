import { Injectable, computed, inject, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Expense } from '../models/expense';
import { ExpenseChartData } from '../models/expense-chart-data';
import { ExpenseFilterType } from '../models/expense-filter-type';
import { ExpenseCategoryService } from './expense-category.service';
import { ExpensesApiService } from './expenses-api.service';
import { PaymentService } from './payment.service';
@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  private expensesApiService = inject(ExpensesApiService);
  private paymentService = inject(PaymentService);
  private categoryService = inject(ExpenseCategoryService);

  _expenses = new BehaviorSubject<Expense[]>([]);
  expensesSig = signal<Expense[]>([]);
  expensesSigLength = computed(() => this.expensesSig().length ?? 0);
  expensesSigTotals = computed(() =>
    this.expensesSig().length ? this.expensesSig()?.map((e => e.valor))?.reduce(function (a, b) { return a + b }) : 0
  );
  yearsWithExpenses = signal<number[]>([]);
  monthsWithExpenses = signal<number[]>([]);

  constructor() {
  }

  create(expense: Expense): Observable<Expense> {
    return this.expensesApiService.create(expense);
  }

  getAllExpensesByYear(year: number): void {
    this.expensesApiService.getAllExpensesByYear(year)
      .subscribe(value => {
        this._expenses.next(value),
          this.expensesSig.set(value)
      });
  }

  getAllExpensesByMonth(month: number, year: number): void {
    this.expensesApiService.getAllExpensesByMonth(month, year)
      .subscribe(value => {
        this._expenses.next(value),
          this.expensesSig.set(value)
      });
  }

  findYearsAndMonths(year: number): void {
    this.getYearsWithExpensesFromUser();
    this.getMonthsWithExpensesFromUserAndYear(year);
  }

  getYearsWithExpensesFromUser(): void {
    this.expensesApiService.getYearsWithExpensesFromUser()
      .subscribe(values => {
        this.yearsWithExpenses.set(values);
      });
  }

  getMonthsWithExpensesFromUserAndYear(year: number): void {
    this.expensesApiService.getMonthsWithExpensesFromUserAndYear(year)
      .subscribe(values => {
        this.monthsWithExpenses.set(values);
      });
  }

  getChartDataByType(type: ExpenseFilterType): ExpenseChartData[] {

    let response = this.expensesToChartData(type);

    return [...response]?.reduce((chartData: ExpenseChartData[], item) => {
      const existingExpense = chartData.find(x => x.label === item.label);
      if (!existingExpense) return chartData.concat(item);
      return (existingExpense.total += item.total, chartData);
    }, []);
  }

  private expensesToChartData(type: ExpenseFilterType): ExpenseChartData[] {
    let response: ExpenseChartData[] = [];

    if (type === ExpenseFilterType.Type) {
      [...this._expenses.getValue()].map(e =>
        response.push({ label: `${this.getTypeName(e.tipoDespesaId)}`, total: e.valor })
      );
    }

    if (type === ExpenseFilterType.Category) {
      [...this._expenses.getValue()].map(e =>
        response.push({ label: `${this.getCategoryName(e.tipoDespesaId)}`, total: e.valor })
      );
    }

    if (type === ExpenseFilterType.Payment) {
      [...this._expenses.getValue()].map(e =>
        response.push({ label: `${this.getPaymentName(e.tipoPagamentoId)}`, total: e.valor })
      );
    }

    return response;
  }

  private getTypeName(id: number): string {
    return this.categoryService.getExpenseTypeName(id);
  }

  private getCategoryName(id: number): string {
    return this.categoryService.getExpenseCategoryNameByType(id);
  }

  private getPaymentName(id: number): string {
    return this.paymentService.getPaymentName(id);
  }

}
