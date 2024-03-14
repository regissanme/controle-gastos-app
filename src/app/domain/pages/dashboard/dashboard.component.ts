import { BreakpointObserver } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ExpensesChartComponent } from '../../charts/expenses-chart/expenses-chart.component';
import { DashboardCardComponent } from '../../components/dashboard-card/dashboard-card.component';
import { TotalsCardComponent } from '../../components/totals-card/totals-card.component';
import { TypeCard } from '../../models/type-card';
import { LayoutService } from './../../../shared/services/layout.service';
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
    ExpensesChartComponent,
  ]
})
export class DashboardComponent {

  private breakpointObserver = inject(BreakpointObserver);
  private expensesService = inject(ExpensesService);
  private layoutService = inject(LayoutService);

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

  /**********************  Layout Service **********************/
  cardLayout$ = this.layoutService.cardLayout;

}
