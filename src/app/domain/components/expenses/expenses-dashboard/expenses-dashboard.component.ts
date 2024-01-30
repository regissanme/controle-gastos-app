import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { map } from 'rxjs';
import { CardHeaderData } from '../../../models/card-header-data';
import { ExpensesService } from '../../../services/expenses.service';
import { DashboardHeaderCardComponent } from '../../dashboard-header-card/dashboard-header-card.component';
import { ExpenseComponent } from '../expense/expense.component';
import { TestComponent } from '../../../../mocks/test/test.component';
import { MonthSelectorComponent } from '../../month-selector/month-selector.component';

@Component({
  selector: 'app-expenses-dashboard',
  standalone: true,
  imports: [CommonModule,
    MatGridListModule,
    DashboardHeaderCardComponent, ExpenseComponent, MonthSelectorComponent
  ],
  templateUrl: './expenses-dashboard.component.html',
  styleUrl: './expenses-dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpensesDashboardComponent {

  private breakpointObserver = inject(BreakpointObserver);
  private expensesService = inject(ExpensesService);

  expenseTotals = this.expensesService.totalExpensesValue;
  selectedMonth = 0;

  expenseData = signal<CardHeaderData>({
    type: 'despesas',
    value: this.expenseTotals(),
    route: '/despesas',
    new: 'Nova Despesa',
    tip: 'Ir para Despesas'
  });

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

  selectMonth(month: number) {
    console.log("Mês Selecionado anterior: ", this.selectedMonth);
    this.selectedMonth = month;
    console.log("Mês Selecionado atual: ", this.selectedMonth);

  }

}