import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { ExpensesChartComponent } from '../../../charts/expenses-chart/expenses-chart.component';
import { TypeCard } from '../../../models/type-card';
import { DashboardCardComponent } from '../../dashboard-card/dashboard-card.component';
import { MonthSelectorComponent } from '../../month-selector/month-selector.component';
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
    TotalsCardComponent, MonthSelectorComponent, ExpenseComponent, ExpensesTableComponent, ExpensesChartComponent, DashboardCardComponent
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

  selectedMonth = new Date().getMonth();
  selectedYear = new Date().getFullYear();

  cardLayout$ = this.layoutService.cardLayout;

  ngOnInit(): void {
    this.expensesService.findYearsAndMonths(this.selectedYear)
    this.getExpenses(this.selectedMonth, this.selectedYear);
  }

  onSelectMonth(month: number): void {
    this.selectedMonth = month;
    this.getExpenses(this.selectedMonth, this.selectedYear);
  }

  onSelectYear(year: number): void {
    this.selectedYear = year;
    this.expensesService.findYearsAndMonths(this.selectedYear)
    this.getExpenses(this.selectedMonth, this.selectedYear);
  }

  getExpenses(month: number, year: number) {
    this.expensesService.getAllExpensesByMonth(this.selectedMonth, this.selectedYear);
  }

}
