import { Component, computed, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TypeCard } from '../../models/type-card';
import { ModalService } from '../../../shared/services/modal.service';
import { ExpenseComponent } from '../expenses/expense/expense.component';

@Component({
  selector: 'app-nothing-yet',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './nothing-yet.component.html',
  styleUrl: './nothing-yet.component.css'
})
export class NothingYetComponent {

  modalService = inject(ModalService);

  type = input.required<TypeCard>();
  iconName = computed(() =>  this.type() === TypeCard.Despesas ? 'icon-ms-expense' : 'icon-ms-income')
  message = computed(() => this.type())

  openDialog(): void {
    if (this.type() === TypeCard.Despesas) {
      this.modalService.showComponent(ExpenseComponent);
    }
  }

}
