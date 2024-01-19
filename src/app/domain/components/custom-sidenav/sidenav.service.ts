import { Injectable } from '@angular/core';
import { MenuItem } from './custom-sidenav.component';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  constructor() { }

  getSidenavItems(): MenuItem[] {
    return [
      {
        icon: 'dashboard',
        label: 'Dashboard',
        route: 'dashboard'
      },
      {
        icon: 'move_to_inbox',
        label: 'Receitas',
        route: 'income'
      },
      {
        icon: 'outbox',
        label: 'Despesas',
        route: 'expenses'
      },
      {
        icon: 'account_box',
        label: 'Perfil',
        route: 'profile'
      },
      {
        icon: 'chat_info',
        label: 'Suporte',
        route: 'support'
      },

    ]
  }
}
