import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import {
  MatDialog
} from '@angular/material/dialog';
import { Expense } from '../../domain/models/expense';
import { ExpenseComponent } from '../../domain/components/expenses/expense/expense.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    public dialog: MatDialog
  ) { }

  showComponent(component: ComponentType<any>, okCallback: () => void = () => { }) {
    const dialogRef = this.dialog.open(component, {
      width: '488px',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && okCallback) {
        okCallback();
      }
    });
  }

  showEditExpense(component: ComponentType<ExpenseComponent>, expense: Expense) {
    const dialogRef = this.dialog.open(component, {
      width: '488px',
      disableClose: false,
      data: expense
    });
  }


}
