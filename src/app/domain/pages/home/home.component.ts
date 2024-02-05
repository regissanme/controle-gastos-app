import { Component, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { CustomSidenavComponent } from '../../components/custom-sidenav/custom-sidenav.component';
import { LoaderService } from '../../../shared/loader.service';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, RouterOutlet,
    CustomSidenavComponent,
    MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatProgressBarModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  title = 'Meu Saldo';

  isLoading = toSignal(this.loaderService.isLoading);
  collapsed = signal(true);
  sidenavWidth = computed(() => this.collapsed() ? '65px' : '200px');

  constructor(
    private authService: AuthService,
    public loaderService: LoaderService,
    private router: Router
  ) { }


  ngOnInit(): void {
    console.log('dashboard on init - logged in: ', this.authService.isLoggedIn());
    if (!this.authService.isLoggedIn()) {
      // this.router.navigate(['/login']);
    }

  }

  onLogout() {
    this.authService.logout();
  }


}
