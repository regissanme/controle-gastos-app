import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ExpenseCategory } from '../models/expense-category';

@Injectable({
  providedIn: 'root'
})
export class ExpenseCategoryService {

  API_URL = "http://localhost:8080/api/v1/despesa/categoria";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  _expensesCategory = new BehaviorSubject<ExpenseCategory[]>([]);

  constructor(private http: HttpClient,) { }

  getAll(): Observable<ExpenseCategory[]> {

    return this.http.get<ExpenseCategory[]>(
      this.API_URL,
      this.httpOptions
    ).pipe(
      tap(categories => this._expensesCategory.next(categories))
    );
  }

  getExpenseCategoryName(categoryId: number): string | undefined {
    if (this._expensesCategory.getValue().length > 0) {
      return this._expensesCategory.getValue().find((e) => e.id === categoryId)?.descricao;
    }
    return undefined;
  }

  getExpenseTypeName(expenseTypeId: number): string | undefined {
    if (this._expensesCategory.getValue().length > 0) {
      return this._expensesCategory.getValue()
        .find(e => e.tiposDespesas
          .find(t => t.id === expenseTypeId))?.tiposDespesas
        .find(t => t.id === expenseTypeId)?.descricao;
    }
    return undefined;
  }

}
