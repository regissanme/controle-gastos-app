import { CommonModule } from '@angular/common';
import { Component, Input, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { User } from '../../../shared/models/user';
import { AuthService } from './../../../core/auth/auth.service';
import { SidenavService } from './sidenav.service';

export type MenuItem = {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-custom-sidenav',
  standalone: true,
  imports: [
    CommonModule, RouterLink, RouterLinkActive,
    MatListModule, MatIconModule, MatButtonModule, MatTooltipModule
  ],
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.css'
})
export class CustomSidenavComponent {

  sidenavCollapsed = signal(false);
  menuItems = signal<MenuItem[]>([]);
  profilePicSize = computed(() => this.sidenavCollapsed() ? '32' : '100');
  user: User = {} as User;

  @Input() set collapsed(val: boolean) {
    this.sidenavCollapsed.set(val);
  }


  constructor(
    private sidenavService: SidenavService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.menuItems.set(sidenavService.getSidenavItems());
    this.getUser();
  }

  private getUser() {
    let storageUser = this.authService.getUser();
    if (storageUser) {
      this.user = storageUser;
    } else {
      this.router.navigate(['/login']);
    }
  }


  getUserSymbol(): string {
    return this.user ? this.user.name.toLocaleUpperCase().charAt(0) : 'MS';
  }

}
