import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTable, MatTableModule } from '@angular/material/table';
import { Expense } from '../../../models/expense';
import { ExpenseCategoryService } from '../../../services/expense-category.service';
import { ExpensesService } from '../../../services/expenses.service';
import { PaymentService } from '../../../services/payment.service';
import { ExpensesTableDataSource } from './expenses-table-datasource';

@Component({
  selector: 'app-expenses-table',
  templateUrl: './expenses-table.component.html',
  styleUrls: ['./expenses-table.component.css'],
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule]
})
export class ExpensesTableComponent implements AfterViewInit {
  expensesService = inject(ExpensesService);
  expenseCategoryService = inject(ExpenseCategoryService);
  paymentService = inject(PaymentService);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Expense>;
  dataSource = new ExpensesTableDataSource(this.expensesService);

  displayedColumns = ['id', 'data', 'valor', 'parcelas', 'descricao', 'tipoPagamentoId', 'tipoDespesaId'];

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;

    this.expenseCategoryService.getAll().subscribe();
    this.paymentService.getAll().subscribe();
  }

  getTypeName(id: number) {
    return this.expenseCategoryService.getExpenseTypeName(id);
  }

  getCategoryName(id: number) {
    return this.expenseCategoryService.getExpenseCategoryName(id);
  }

  getPaymentName(id: number) {
    return this.paymentService.getPaymentName(id);
  }
}
