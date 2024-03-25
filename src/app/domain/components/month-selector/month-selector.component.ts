import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnChanges, Output, SimpleChanges, input, model } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

export interface Month {
  index: number;
  name: string;
}

@Component({
  selector: 'app-month-selector',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatCardModule, MatIconModule, MatMenuModule, MatButtonModule,
    MatTooltipModule, MatButtonToggleModule, MatDatepickerModule
  ],
  templateUrl: './month-selector.component.html',
  styleUrl: './month-selector.component.css'
})
export class MonthSelectorComponent implements OnChanges {

  @Output() monthEvent = new EventEmitter<number>();
  @Output() yearEvent = new EventEmitter<number>();
  // @Input({ required: true }) activeMonths!: number[];
  // @Input({ required: true }) activeYears!: number[];

  // selectedYear = new Date().getFullYear();
  // selectedMonth = new Date().getMonth() + 1;

  activeMonths = input.required<number[]>()
  activeYears = input.required<number[]>()
  selectedYear = model.required<number>();
  selectedMonth = model.required<number>();
  yearChanged = false;



  months: Month[] = [
    { index: 1, name: "JAN" },
    { index: 2, name: "FEV" },
    { index: 3, name: "MAR" },
    { index: 4, name: "ABR" },
    { index: 5, name: "MAI" },
    { index: 6, name: "JUN" },
    { index: 7, name: "JUL" },
    { index: 8, name: "AGO" },
    { index: 9, name: "SET" },
    { index: 10, name: "OUT" },
    { index: 11, name: "NOV" },
    { index: 12, name: "DEZ" },
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activeMonths'] && this.yearChanged) {
      this.selectedMonth.set(this.activeMonths()[0]);
      this.monthEvent.emit(this.selectedMonth());
      this.yearChanged = false;
    }
  }

  onSelectMonth(month: number): void {
    if (this.selectedMonth() === month) return;

    this.selectedMonth.set(month);
    this.monthEvent.emit(this.selectedMonth());
  }

  onSelectYear(year: number): void {
    if (this.selectedYear() === year) return;

    this.selectedYear.set(year);
    this.yearChanged = true;
    this.yearEvent.emit(this.selectedYear());

  }

  monthDisabled(index: number): boolean {
    return this.activeMonths().filter(m => m === index).length === 0;
  }

  yearDisabled(year: number): boolean {
    return this.activeYears().filter(y => y === year).length === 0;
  }

}


