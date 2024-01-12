import { CommonModule } from '@angular/common';
import { Component, Input, computed, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { User } from '../../../shared/models/user';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

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

  user: User = {
    name: 'Reginaldo Santos de Medeiros',
    active: true,
    username: 'teste@email.com',
    birthdate: '1978-11-14',
    role: 'Admin',
    lastAccessAt: '',
    token: '',
    id: ''
  };
  sidenavCollapsed = signal(false);

  @Input() set collapsed(val: boolean) {
    this.sidenavCollapsed.set(val);
  }
  @Input() setUser(user: User) {
    this.user = user;
  }

  menuItems = signal<MenuItem[]>([
    {
      icon: 'dashboard',
      label: 'Dashboard',
      route: 'dashboard'
    },
    {
      icon: 'analytics',
      label: 'Receitas',
      route: 'content'
    },
    {
      icon: 'analytics',
      label: 'Despesas',
      route: 'analytcs'
    },

  ]);

  profilePicSize = computed(() => this.sidenavCollapsed() ? '32' : '100');

  getSymbol(): string {
    return this.user ? this.user.name.toLocaleUpperCase().charAt(0) : 'R';
  }

}
