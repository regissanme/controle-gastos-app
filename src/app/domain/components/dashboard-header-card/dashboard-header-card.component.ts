import { CommonModule } from '@angular/common';
import { Component, Input, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { ModalService } from '../../../shared/modal.service';
import { NotificationService } from '../../../shared/notification.service';
import { CardHeaderData } from '../../models/card-header-data';
import { ExpenseComponent } from '../expenses/expense/expense.component';

@Component({
  selector: 'app-dashboard-header-card',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    MatButtonModule, MatIconModule, MatTooltipModule
  ],
  templateUrl: './dashboard-header-card.component.html',
  styleUrl: './dashboard-header-card.component.css',
})
export class DashboardHeaderCardComponent {
  notificationService = inject(NotificationService);
  modalService = inject(ModalService);

  @Input() set data(data: CardHeaderData) {
    this.dataCard.set(data);
    this.backgroundTheme = this.getThemes();
    this.iconName = this.getIcon();
    console.log("Updating data in header card: " + this.dataCard().value)
  }

  @Input() dataSig = signal<CardHeaderData>({} as CardHeaderData);

  dataCard = signal<CardHeaderData>({} as CardHeaderData);

  backgroundTheme = this.getThemes();
  valueTheme = 'value';
  iconName = 'payments';

  getIcon() {
    if (this.dataCard()?.type === 'despesas') {
      return 'sell';
    } if (this.dataCard()?.type === 'receitas') {
      return 'local_atm';
    } else {
      return 'price_change';
    }
  }

  getThemes() {

    this.valueTheme = (this.dataCard().value < 0) ? 'value-negative' : 'value';

    if (this.dataCard().type === 'despesas') {
      return 'gradient-expenses';
    } if (this.dataCard().type === 'receitas') {
      return 'gradient-income';
    } else {
      return 'gradient-totals';
    }
  }

  openDialog() {
    if (this.dataCard().type === 'despesas') {
      this.modalService.showComponent(ExpenseComponent);
    }
  }

}
