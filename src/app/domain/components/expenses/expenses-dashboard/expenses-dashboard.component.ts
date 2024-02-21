import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { map } from 'rxjs';
import { TypeCard } from '../../../models/type-card';
import { MonthSelectorComponent } from '../../month-selector/month-selector.component';
import { TotalsCardComponent } from '../../totals-card/totals-card.component';
import { ExpenseComponent } from '../expense/expense.component';
import { ExpensesService } from './../../../services/expenses.service';
import { ExpensesTableComponent } from '../expenses-table/expenses-table.component';

@Component({
  selector: 'app-expenses-dashboard',
  standalone: true,
  imports: [CommonModule,
    MatGridListModule,
    TotalsCardComponent, MonthSelectorComponent, ExpenseComponent, ExpensesTableComponent
  ],
  templateUrl: './expenses-dashboard.component.html',
  styleUrl: './expenses-dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpensesDashboardComponent implements OnInit {

  private breakpointObserver = inject(BreakpointObserver);
  private expensesService = inject(ExpensesService);

  expenseRoute = "app/expenses";
  expenseTypeCard = TypeCard.Despesas;
  expensesValue = this.expensesService.expensesSigTotals;
  expenseQuantity = this.expensesService.expensesSigLength;
  selectedMonth = new Date().getMonth();
  selectedYear = new Date().getFullYear();

  cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 1,
          miniCard: { cols: 1, rows: 1 },
          monthCard: { cols: 1, rows: 2 },
          chart: { cols: 1, rows: 2 },
          table: { cols: 1, rows: 4 },
        };
      }

      return {
        columns: 12,
        miniCard: { cols: 4, rows: 1 },
        monthCard: { cols: 8, rows: 1 },
        chart: { cols: 6, rows: 2 },
        table: { cols: 12, rows: 4 },
      };
    })
  );

  ngOnInit(): void {
    this.expensesService.getAllExpenses(this.selectedMonth, this.selectedYear);
  }

  selectMonth(month: number): void {
    this.selectedMonth = month;
    console.log("Mês Selecionado atual: ", this.selectedMonth);
    this.expensesService.getAllExpenses(this.selectedMonth, this.selectedYear);
  }

  selectYear(year: number): void {
    this.selectedYear = year;
    console.log("Ano Selecionado atual: ", this.selectedYear);
    this.expensesService.getAllExpenses(this.selectedMonth, this.selectedYear);
  }

}
