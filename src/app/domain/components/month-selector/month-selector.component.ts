import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
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
    MatCardModule, MatIconModule, MatMenuModule, MatButtonModule, MatTooltipModule, MatButtonToggleModule, MatDatepickerModule
  ],
  templateUrl: './month-selector.component.html',
  styleUrl: './month-selector.component.css'
})
export class MonthSelectorComponent {

  @Output() monthEvent = new EventEmitter<number>();
  @Output() yearEvent = new EventEmitter<number>();


  months: Month[] = [
    { index: 0, name: "JAN" },
    { index: 1, name: "FEV" },
    { index: 2, name: "MAR" },
    { index: 3, name: "ABR" },
    { index: 4, name: "MAI" },
    { index: 5, name: "JUN" },
    { index: 6, name: "JUL" },
    { index: 7, name: "AGO" },
    { index: 8, name: "SET" },
    { index: 9, name: "OUT" },
    { index: 10, name: "NOV" },
    { index: 11, name: "DEZ" },
  ];

  years: number[] = [
    2012,
    2013,
    2014,
    2015,
    2016,
    2017,
    2018,
    2019,
    2020,
    2021,
    2022,
    2023,
    2024
  ];

  selectedYear = new Date().getFullYear();
  selectedMonth = new Date().getMonth();
  selected: Date | null = new Date();
  monthControl = new FormControl(this.selectMonth);
  yearControl = new FormControl(this.selectedYear);

  selectMonth(month: number) {
    if (this.selectedMonth === month) return;

    console.log("Emitindo Mês selecionado: ", month);
    this.selectedMonth = month;
    this.monthEvent.emit(month);
  }

  selectYear(year: number) {
    if (this.selectedYear === year) return;

    console.log("Emitindo Ano selecionado: ", year);
    this.selectedYear = year;
    this.yearEvent.emit(year);
  }

}


