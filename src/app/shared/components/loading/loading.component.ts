import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'loading',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent {

  loadergService = inject(LoaderService);

}
