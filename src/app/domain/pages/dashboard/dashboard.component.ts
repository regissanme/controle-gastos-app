import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { map } from 'rxjs/operators';
import { MonthlyChartComponent } from '../../charts/monthly-chart/monthly-chart.component';
import { DashboardCardComponent } from '../../components/dashboard-card/dashboard-card.component';
import { DashboardHeaderCardComponent } from '../../components/dashboard-header-card/dashboard-header-card.component';
import { ExpensesTableComponent } from '../../components/expenses-table/expenses-table.component';

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
    ExpensesTableComponent,
    MonthlyChartComponent,
  ]
})
export class DashboardComponent {
  private breakpointObserver = inject(BreakpointObserver);

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
        columns: 4,
        miniCard: { cols: 1, rows: 1 },
        chart: { cols: 2, rows: 2 },
        table: { cols: 4, rows: 4 },
      };
    })
  );

}
