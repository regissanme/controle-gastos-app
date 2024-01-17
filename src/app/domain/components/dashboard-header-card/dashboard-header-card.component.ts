import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-dashboard-header-card',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './dashboard-header-card.component.html',
  styleUrl: './dashboard-header-card.component.css'
})
export class DashboardHeaderCardComponent {

}
