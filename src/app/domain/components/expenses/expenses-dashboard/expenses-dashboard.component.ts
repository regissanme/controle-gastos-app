import { TypesTotal } from './../../../../mocks/card-test/card-test.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { map } from 'rxjs';
import { CardHeaderData } from '../../../models/card-header-data';
import { DashboardHeaderCardComponent } from '../../dashboard-header-card/dashboard-header-card.component';
import { MonthSelectorComponent } from '../../month-selector/month-selector.component';
import { ExpenseComponent } from '../expense/expense.component';
import { ExpensesService } from './../../../services/expenses.service';
import { TotalsCardComponent } from '../../totals-card/totals-card.component';
import { TypeCard } from '../../../models/type-card';

@Component({
  selector: 'app-expenses-dashboard',
  standalone: true,
  imports: [CommonModule,
    MatGridListModule,
    TotalsCardComponent, ExpenseComponent, MonthSelectorComponent
  ],
  templateUrl: './expenses-dashboard.component.html',
  styleUrl: './expenses-dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpensesDashboardComponent implements OnInit{

  private breakpointObserver = inject(BreakpointObserver);
  private expensesService = inject(ExpensesService);

  expenseRoute = "app/expenses";
  expenseTypeCard = TypeCard.Despesas;
  expensesValue = this.expensesService.expensesSigTotals;
  expenseQuantity = this.expensesService.expensesSigLength;
  selectedMonth = 0;

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
    this.expensesService.getAllExpenses();
  }

  selectMonth(month: number) {
    console.log("Mês Selecionado anterior: ", this.selectedMonth);
    this.selectedMonth = month;
    console.log("Mês Selecionado atual: ", this.selectedMonth);
  }

}
