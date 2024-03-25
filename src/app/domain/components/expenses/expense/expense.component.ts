import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';
import { AuthService } from '../../../../core/auth/auth.service';
import { NotificationService } from '../../../../shared/services/notification.service';
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
    MatSelectModule, MatInputModule, MatIconModule, MatCardModule, MatButtonModule, MatDatepickerModule
  ],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.css'
})
export class ExpenseComponent {

  expenseForm = this.fb.group({
    id: [0],
    data: ['', Validators.required],
    valor: [0, Validators.compose([Validators.required, Validators.min(0.01)])],
    parcelas: [1, Validators.compose([Validators.required, Validators.min(1)])],
    descricao: [''],
    tipoPagamentoId: [0, Validators.compose([Validators.required, Validators.min(1)])],
    tipoDespesaId: [0, Validators.compose([Validators.required, Validators.min(1)])],
    userId: [0]
  });

  expenseCategories$: Observable<ExpenseCategory[]> = this.expenseCategoryService.getAll();
  payment$: Observable<PaymentType[]> = this.paymentService.getAll();
  selectedCategory = new FormControl<ExpenseCategory | null>(null, Validators.required);
  expensesTypes = new FormControl<ExpenseType[] | null>(null, Validators.required);


  constructor(
    private authService: AuthService,
    private expenseService: ExpensesService,
    private expenseCategoryService: ExpenseCategoryService,
    private paymentService: PaymentService,
    private notificationService: NotificationService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ExpenseComponent>
  ) {

  }

  get(value: string) {
    return this.expenseForm.get(value);
  }

  onSubmit() {

    if (this.expenseForm.valid && this.authService.isLoggedIn() && !this.authService.isExpired()) {

      const expense: Expense = this.expenseForm.value as Expense;
      let userId = this.authService.currentUserSig()?.id;

      if (userId && userId != '') {
        expense.userId = +userId;

        this.expenseService.create(expense).subscribe({
          next: response => {
            this.notificationService.success("Despesa salva com sucesso!");
            this.expenseService.getAllExpensesByMonth(
              this.getDate(response.data).getMonth()+1,
              this.getDate(response.data).getFullYear()
            );
          },
          error: err => {
            console.log("Erro ao salvar: " + JSON.stringify(err));
            throw new HttpErrorResponse(err);
          },
          complete: () => this.resetForm()
        })
      }
    } else {
      this.expenseForm.markAllAsTouched();
      this.expenseForm.markAsTouched();
      console.log("Formulário inválido ou usuário não logado!")
    }
  }
  resetForm() {
    this.expenseForm.reset();
    this.selectedCategory.setValue(null);
    this.close();
  }

  close() {
    this.dialogRef.close();
  }

  private getDate(date: string): Date {
    return new Date(date);
  }

}
