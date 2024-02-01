import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { map } from 'rxjs/operators';
import { MonthlyChartComponent } from '../../charts/monthly-chart/monthly-chart.component';
import { DashboardCardComponent } from '../../components/dashboard-card/dashboard-card.component';
import { TotalsCardComponent } from '../../components/totals-card/totals-card.component';
import { TypeCard } from '../../models/type-card';
import { ExpensesService } from './../../services/expenses.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [
    CommonModule, AsyncPipe,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    MatMenuModule,

    DashboardCardComponent,
    TotalsCardComponent,
    MonthlyChartComponent,
  ]
})
export class DashboardComponent {

  private breakpointObserver = inject(BreakpointObserver);
  private expensesService = inject(ExpensesService);

  selectedMonth = 0;

  /*********************** Expenses data ***********************/
  expenseRoute = "app/expenses";
  expenseTypeCard = TypeCard.Despesas;
  expensesValue = this.expensesService.expensesSigTotals;

  /***********************  Income data  ***********************/
  incomeRoute = "app/income";
  incomeTypeCard = TypeCard.Receitas;
  incomeValue = signal<number>(0);

  /***********************  Balance data ***********************/
  balanceRoute = "app/balance";
  balanceTypeCard = TypeCard.Saldo;
  balanceValue = computed(() => this.incomeValue() - this.expensesValue());


  cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 1,
          miniCard: { cols: 1, rows: 1 },
          chart: { cols: 1, rows: 2 },
          table: { cols: 1, rows: 4 },
        };
      }

      return {
        columns: 12,
        miniCard: { cols: 4, rows: 1 },
        chart: { cols: 6, rows: 2 },
        table: { cols: 12, rows: 4 },
      };
    })
  );

}
