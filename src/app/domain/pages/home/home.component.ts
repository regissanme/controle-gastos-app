import { Component, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterOutlet } from '@angular/router';
import { StorageService } from '../../../core/storage/storage.service';
import { User } from '../../../shared/models/user';
import { CustomSidenavComponent } from '../../components/custom-sidenav/custom-sidenav.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    CustomSidenavComponent,
    MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  title = 'Meu Saldo';

  collapsed = signal(true);
  sidenavWidth = computed(() => this.collapsed() ? '65px' : '200px');

  user?: User;

  constructor(
    private storageService: StorageService,
    private router: Router
  ) { }


  ngOnInit(): void {
    console.log('dashboard on init - logged in: ', this.storageService.isLoggedIn());
    if (!this.storageService.isLoggedIn()) {
      // this.router.navigate(['/login']);
    } else {
      this.user = this.storageService.getUser();
    }
  }


}
