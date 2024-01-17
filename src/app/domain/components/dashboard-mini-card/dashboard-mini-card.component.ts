import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TestComponent } from '../../../mocks/test/test.component';

@Component({
  selector: 'app-dashboard-mini-card',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, TestComponent],
  templateUrl: './dashboard-mini-card.component.html',
  styleUrl: './dashboard-mini-card.component.css'
})
export class DashboardMiniCardComponent {

}
