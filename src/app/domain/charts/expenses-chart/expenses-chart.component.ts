import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ExpenseChartData } from '../../models/expense-chart-data';
import { ExpenseFilterType } from '../../models/expense-filter-type';
import { ExpensesService } from '../../services/expenses.service';

@Component({
  selector: 'app-expenses-chart',
  standalone: true,
  imports: [BaseChartDirective, ReactiveFormsModule,
    MatSelectModule, MatInputModule,
  ],
  templateUrl: './expenses-chart.component.html',
  styleUrls: ['./expenses-chart.component.css']
})
export class ExpensesChartComponent implements OnInit {

  private expensesService = inject(ExpensesService);

  filterTypes: ExpenseFilterType[] = [ExpenseFilterType.Type, ExpenseFilterType.Payment, ExpenseFilterType.Category];
  selectedType: ExpenseFilterType = ExpenseFilterType.Type;
  type = new FormControl<ExpenseFilterType | null>(this.selectedType);

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartOptions = {
    responsive: true,
  };

  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Despesas',
        backgroundColor: '#c41e3a',
      },
    ],
  };

  constructor() { }

  ngOnInit(): void {
    this.expensesService._expenses.subscribe(expenses => {
      this.setData();
    });

    this.type.valueChanges.subscribe(type => {
      type ? this.selectedType = type : ExpenseFilterType.Type,
        this.setData()
    });
  }

  setData() {
    let changedData: ExpenseChartData[] = [];
    changedData = this.expensesService.getChartDataByType(this.selectedType);

    this.barChartData.labels = changedData.map(row => row.label);
    this.barChartData.datasets[0].data = changedData.map(row => row.total);
    this.barChartData.datasets[0].label = `Despesas por ${this.selectedType}`;

    this.chart?.update();
  }

}
