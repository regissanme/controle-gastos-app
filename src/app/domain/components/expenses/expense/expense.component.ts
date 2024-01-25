import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';
import { AuthService } from '../../../../core/auth/auth.service';
import { Expense } from '../../../models/expense';
import { ExpenseCategory } from '../../../models/expense-category';
import { ExpenseType } from '../../../models/expense-type';
import { PaymentType } from '../../../models/payment-type';
import { ExpenseCategoryService } from '../../../services/expense-category.service';
import { ExpensesService } from '../../../services/expenses.service';
import { PaymentService } from '../../../services/payment.service';


@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,
    MatSelectModule, MatInputModule, MatIconModule, MatCardModule, MatButtonModule
  ],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.css'
})
export class ExpenseComponent {

  expenseForm = this.fb.group({
    id: [0],
    mes: ['', Validators.required],
    valor: [0, Validators.required],
    descricao: [''],
    tipoPagamentoId: [0, Validators.required],
    tipoDespesaId: [0, Validators.required],
    userId: [0]
  });

  expenseCategories$: Observable<ExpenseCategory[]>;
  payment$: Observable<PaymentType[]>;
  selectedCategory = new FormControl<ExpenseCategory | null>(null);
  expensesTypes = new FormControl<ExpenseType[] | null>(null, Validators.required);


  constructor(
    private authService: AuthService,
    private expenseService: ExpensesService,
    private expenseCategoryService: ExpenseCategoryService,
    private paymentService: PaymentService,
    private fb: FormBuilder,
  ) {
    this.expenseCategories$ = expenseCategoryService.getAll();
    this.payment$ = paymentService.getAll();
  }

  get(value: string) {
    return this.expenseForm.get(value)?.value;
  }

  onSubmit() {

    if (this.expenseForm.valid && this.authService.isLoggedIn()) {

      const expense: Expense = this.expenseForm.value as Expense;
      let userId = this.authService.currentUserSig()?.id;

      if (userId && userId != '') {
        expense.userId = +userId
        console.log(`saveExpense(${userId}):`);
      } else {
        console.log("Não possui usuário logado!");
        return;
      }

      console.log('Despesa para salvar: ', JSON.stringify(expense));

      this.expenseService.create(expense).subscribe({
        next: response => {
          console.log("Despesa salva: " + JSON.stringify(response));
        },
        error: err => {
          console.log("Erro ao salvar: " + JSON.stringify(err));
          this.resetForm();
        }
      })
    } else {
      this.expenseForm.markAllAsTouched();
      this.expenseForm.markAsTouched();
      console.log("Formulário inválido ou usuário não logado!")
    }
  }


  resetForm() {
    this.expenseForm.reset();
    this.selectedCategory.setValue(null);
    // this.expenseForm.value.mes = new Date().toDateString();
  }

}
