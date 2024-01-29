import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { map } from 'rxjs/operators';
import { MonthlyChartComponent } from '../../charts/monthly-chart/monthly-chart.component';
import { DashboardCardComponent } from '../../components/dashboard-card/dashboard-card.component';
import { DashboardHeaderCardComponent } from '../../components/dashboard-header-card/dashboard-header-card.component';
import { CardHeaderData } from '../../models/card-header-data';
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
    DashboardHeaderCardComponent,
    MonthlyChartComponent,
  ]
})
export class DashboardComponent {

  private breakpointObserver = inject(BreakpointObserver);
  private expensesService = inject(ExpensesService);

  expenses = this.expensesService.expenses;
  expenseTotals = this.expensesService.totalExpensesValue;

  // Expenses Card header data
  // expenseTotals = computed(() => this.expensesService.totalExpensesValues() ?? 0);
  expenseData = signal<CardHeaderData>({
    type: 'despesas',
    value: this.expenseTotals(),
    route: '/despesas',
    new: 'Nova Despesa',
    tip: 'Ir para Despesas'
  });

  // Income Card header data
  incomeTotals = signal(0);
  incomeData = signal<CardHeaderData>(
    {
      type: 'receitas',
      value: this.incomeTotals(),
      route: '/receitas',
      new: 'Nova Receita',
      tip: 'Ir para Receitas'
    }
  );

  // Balance Card header data
  balance = computed(() => this.incomeTotals() - this.expenseTotals());
  balanceData = signal<CardHeaderData>(
    {
      type: 'saldo',
      value: this.balance(),
      route: '/saldo',
      new: '',
      tip: 'Ir para o Saldo'
    }
  );




  // totals = signal<CardHeaderData[]>([
  //   {
  //     type: 'receitas',
  //     value: 9900.00,
  //     route: '/receitas',
  //     new: 'Nova Receita',
  //     tip: 'Ir para Receitas'
  //   },
  //   {
  //     type: 'despesas',
  //     value: this.expenseTotals(),
  //     route: '/despesas',
  //     new: 'Nova Despesa',
  //     tip: 'Ir para Despesas'
  //   },
  //   {
  //     type: 'saldo',
  //     value: 2400.00,
  //     route: '/saldo',
  //     new: '',
  //     tip: 'Ir para o Saldo'
  //   }
  // ]);

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



  // cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
  //   map(({ matches }) => {
  //     if (matches) {
  //       return {
  //         columns: 1,
  //         miniCard: { cols: 1, rows: 1 },
  //         chart: { cols: 1, rows: 2 },
  //         table: { cols: 1, rows: 4 },
  //       };
  //     }

  //     return {
  //       columns: 4,
  //       miniCard: { cols: 1, rows: 1 },
  //       chart: { cols: 2, rows: 2 },
  //       table: { cols: 4, rows: 4 },
  //     };
  //   })
  // );

}
