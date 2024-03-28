import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoaderService } from '../../shared/services/loader.service';
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

  constructor(private http: HttpClient, private loaderService: LoaderService) { }

  getAll(): Observable<ExpenseCategory[]> {

    const response = this.http.get<ExpenseCategory[]>(
      this.API_URL,
      this.httpOptions
    ).pipe(
      tap(categories => this._expensesCategory.next(categories))
    );

    return this.loaderService.showLoadingUntilCompleted(response);
  }

  getById(expenseCategoryId: number) {
    return this._expensesCategory.getValue().find(e => e.id === expenseCategoryId);
  }

  getExpenseCategoryName(categoryId: number): string {
    return this._expensesCategory.getValue().find((e) => e.id === categoryId)?.descricao ?? 'none';
  }

  getExpenseCategoryNameByType(expenseTypeId: number): string {
    return this._expensesCategory.getValue()
      .find(e => e.tiposDespesas.find(t => t.id === expenseTypeId))?.descricao ?? 'none';
  }

  getExpenseTypeName(expenseTypeId: number): string {
    return this._expensesCategory.getValue()
      .find(e => e.tiposDespesas.find(t => t.id === expenseTypeId))?.tiposDespesas
      .find(t => t.id === expenseTypeId)?.descricao ?? 'none';
  }

  getExpenseCategoryByExpensetype(expenseTypeId: number) {
    return this._expensesCategory.getValue()
      .find(e => e.tiposDespesas.find(t => t.id === expenseTypeId));
  }

}
