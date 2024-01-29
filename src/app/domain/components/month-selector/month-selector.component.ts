import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

export interface month {
  index: number;
  name: string;
}

@Component({
  selector: 'app-month-selector',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatCardModule, MatIconModule, MatMenuModule, MatButtonModule, MatTooltipModule, MatButtonToggleModule
  ],
  templateUrl: './month-selector.component.html',
  styleUrl: './month-selector.component.css'
})
export class MonthSelectorComponent {

  monthControl = new FormControl('')
  months = signal<month[]>([
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
  ]
  );

}
