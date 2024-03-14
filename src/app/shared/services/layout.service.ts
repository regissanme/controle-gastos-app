import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

export interface CardLayout {
  columns: number,
  miniCard: { cols: number, rows: number },
  monthCard: { cols: number, rows: number },
  balanceCard: { cols: number, rows: number },
  chart: { cols: number, rows: number },
  table: { cols: number, rows: number },
};

@Injectable({
  providedIn: 'root'
})
export class LayoutService implements OnDestroy {

  destroyed = new Subject<void>();
  private _cardLayout = new BehaviorSubject<CardLayout>({
    columns: 1,
    miniCard: { cols: 1, rows: 1 },
    monthCard: { cols: 1, rows: 2 },
    balanceCard: { cols: 1, rows: 1 },
    chart: { cols: 1, rows: 2 },
    table: { cols: 1, rows: 4 },
  });

  cardLayout = this._cardLayout.asObservable();


  constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe(result => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.changeLayout(query);
          }
        }
      });
  }

  changeLayout(breakpoint: string) {
    switch (breakpoint) {
      case Breakpoints.XSmall:
      case Breakpoints.Small:
        this._cardLayout.next({
          columns: 1,
          miniCard: { cols: 1, rows: 1 },
          monthCard: { cols: 1, rows: 2 },
          balanceCard: { cols: 1, rows: 1 },
          chart: { cols: 1, rows: 2 },
          table: { cols: 1, rows: 4 },
        });
        break;

      case Breakpoints.Medium:
      case Breakpoints.Large:
      case Breakpoints.XLarge:
        this._cardLayout.next({
          columns: 12,
          miniCard: { cols: 6, rows: 1 },
          balanceCard: { cols: 4, rows: 1 },
          monthCard: { cols: 8, rows: 1 },
          chart: { cols: 6, rows: 2 },
          table: { cols: 12, rows: 4 },
        });
        break;

      default: {
        console.log("Layout default: ", breakpoint);
        this._cardLayout.next({
          columns: 12,
          miniCard: { cols: 6, rows: 1 },
          monthCard: { cols: 8, rows: 1 },
          balanceCard: { cols: 4, rows: 1 },
          chart: { cols: 6, rows: 2 },
          table: { cols: 12, rows: 4 },
        });
        break;
      }
    }
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
