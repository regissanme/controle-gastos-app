import { Component, Input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { CardHeaderData } from '../../models/card-header-data';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard-header-card',
  standalone: true,
  imports: [
    RouterLink, DecimalPipe,
    MatButtonModule, MatIconModule, MatTooltipModule
  ],
  templateUrl: './dashboard-header-card.component.html',
  styleUrl: './dashboard-header-card.component.css'
})
export class DashboardHeaderCardComponent {

  @Input() set data(data: CardHeaderData) {
    this.dataCard.set(data);
    this.backgroundTheme = this.getTheme();
    this.iconName = this.getIcon();
  }

  dataCard = signal<CardHeaderData>({
    type: 'receitas',
    value: '99900.00',
    route: '#',
    new: 'Novo',
    tip: "Ir para..."
  });

  backgroundTheme = this.getTheme();
  valueTheme = 'value';
  iconName = 'payments';

  getIcon() {
    if (this.dataCard().type === 'despesas') {
      return 'sell';
    } if (this.dataCard().type === 'receitas') {
      return 'local_atm';
    } else {
      return 'price_change';
    }
  }

  getTheme() {
    this.valueTheme = (+this.dataCard().value < 0) ? 'value-negative' : 'value';

    if (this.dataCard().type === 'despesas') {
      return 'gradient-expenses';
    } if (this.dataCard().type === 'receitas') {
      return 'gradient-income';
    } else {
      return 'gradient-totals';
    }
  }

}
