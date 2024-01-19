import { Component, inject } from '@angular/core';
import { ExpenseCategoryService } from '../../../services/expense-category.service';
import { Observable } from 'rxjs';
import { ExpenseCategory } from '../../../models/expense-category';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.css'
})
export class ExpenseComponent {

  //expenseCategoryService = inject(ExpenseCategoryService);

  expenseCategories$: Observable<ExpenseCategory[]>;

  constructor(private expenseCategoryService: ExpenseCategoryService) {
    this.expenseCategories$ = expenseCategoryService.getAll();
  }


}
