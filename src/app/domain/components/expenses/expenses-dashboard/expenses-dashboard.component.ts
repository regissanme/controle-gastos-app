import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, computed, inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { ExpensesChartComponent } from '../../../charts/expenses-chart/expenses-chart.component';
import { TypeCard } from '../../../models/type-card';
import { DashboardCardComponent } from '../../dashboard-card/dashboard-card.component';
import { MonthSelectorComponent } from '../../month-selector/month-selector.component';
import { NothingYetComponent } from '../../nothing-yet/nothing-yet.component';
import { TotalsCardComponent } from '../../totals-card/totals-card.component';
import { ExpenseComponent } from '../expense/expense.component';
import { ExpensesTableComponent } from '../expenses-table/expenses-table.component';
import { LayoutService } from './../../../../shared/services/layout.service';
import { ExpensesService } from './../../../services/expenses.service';

@Component({
  selector: 'app-expenses-dashboard',
  standalone: true,
  imports: [CommonModule,
    MatGridListModule,
    ExpenseComponent, ExpensesTableComponent, ExpensesChartComponent,
    TotalsCardComponent, MonthSelectorComponent, DashboardCardComponent, NothingYetComponent
  ],
  templateUrl: './expenses-dashboard.component.html',
  styleUrl: './expenses-dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpensesDashboardComponent implements OnInit {

  private expensesService = inject(ExpensesService);
  private layoutService = inject(LayoutService);

  expenseRoute = "app/expenses";
  expenseTypeCard = TypeCard.Despesas;
  expensesValue = this.expensesService.expensesSigTotals;
  expenseQuantity = this.expensesService.expensesSigLength;
  activeMonths = this.expensesService.monthsWithExpenses;
  activeYears = this.expensesService.yearsWithExpenses;

  selectedMonth = this.expensesService.selectedMonth;
  selectedYear = this.expensesService.selectedYear;

  cardLayout$ = this.layoutService.cardLayout;
  hasExpenses = computed(() => this.expenseQuantity() > 0);

  ngOnInit(): void {
    this.expensesService.findYearsAndMonths(this.selectedYear())
    this.getExpenses();
  }

  onSelectMonth(month: number): void {
    // this.selectedMonth.set(month);
    this.getExpenses();
  }

  onSelectYear(year: number): void {
    // this.selectedYear.set(year);
    this.expensesService.findYearsAndMonths(this.selectedYear());
    this.selectedMonth.set(this.activeMonths()[0]);
    // this.getExpenses();
  }

  getExpenses() {
    console.log("Dashboard - month: " + this.selectedMonth() + " year: " + this.selectedYear())
    this.expensesService.getAllExpensesByMonth(this.selectedMonth(), this.selectedYear());
  }

}
