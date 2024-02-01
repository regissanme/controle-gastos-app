import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { ExpenseComponent } from '../expenses/expense/expense.component';
import { ModalService } from '../../../shared/modal.service';
import { TypeCard } from '../../models/type-card';

@Component({
  selector: 'app-totals-card',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    MatButtonModule, MatIconModule, MatTooltipModule
  ],
  templateUrl: './totals-card.component.html',
  styleUrl: './totals-card.component.css'
})
export class TotalsCardComponent implements OnChanges {

  modalService = inject(ModalService);

  @Input() type: TypeCard = TypeCard.Saldo ;
  @Input() value = 0 ;
  @Input() route = '';
  @Input() showRoute: boolean = false;
  @Input() quantity = 0;

  totals = signal<number>(0);

  backgroundTheme = 'gradient-totals';
  valueTheme = 'value';
  iconName = 'payments';
  tip = 'Novo';

  ngOnChanges(changes: SimpleChanges): void {
    if (this.type) {
      this.setThemes();
    }
    if (this.value) {
      this.totals.set(this.value);
    }
  }

  setThemes() {
    if (this.value) {
      this.valueTheme = (this.value < 0) ? 'value-negative' : 'value';
    }

    if (this.type === TypeCard.Despesas) {
      this.iconName = 'sell';
      this.backgroundTheme = 'gradient-expenses';
      this.tip = "Nova Despesa";

    } else if (this.type === TypeCard.Receitas) {
      this.iconName = 'local_atm';
      this.backgroundTheme = 'gradient-income';
      this.tip = "Nova Receita";

    } else {
      this.iconName = 'price_change';
      this.backgroundTheme = 'gradient-totals';
    }
  }

  openDialog() {
    if (this.type === TypeCard.Despesas) {
      this.modalService.showComponent(ExpenseComponent);
    }
  }

}
