import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, Observable, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { Expense } from '../../../models/expense';
import { ExpensesService } from '../../../services/expenses.service';


export class ExpensesTableDataSource extends DataSource<Expense> {
  expenses$ = new BehaviorSubject<Expense[]>([]);
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(private expensesService: ExpensesService) {
    super();
    expensesService._expenses.subscribe(expenses => {
      this.expenses$.next(expenses);
    });
  }

  connect(): Observable<Expense[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      // return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
      return merge(this.expenses$.asObservable(), this.paginator.page, this.sort.sortChange)
        .pipe(
          map(() => {
            return this.getPagedData(this.getSortedData([...this.expenses$.getValue()]));
          }
          )
        );
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  disconnect(): void {
    this.expenses$.complete();
  }

  loadExpenses(): void {
    this.expensesService._expenses.subscribe(expenses => {
      this.expenses$.next(expenses);
    });
  }

  private getPagedData(data: Expense[]): Expense[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  private getSortedData(data: Expense[]): Expense[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'valor': return compare(a.valor, b.valor, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'parcelas': return compare(+a.parcelas, +b.parcelas, isAsc);
        case 'data': return compare(a.data, b.data, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
