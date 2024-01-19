import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';


export const DOMAIN_ROUTES: Routes = [
  // { path: '', component: HomeComponent },
  // { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  {
    path: '',
    component: HomeComponent, // this is the component with the <router-outlet> in the template
    children: [
      { path: '',   redirectTo: '/app/dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'expenses', loadComponent: () => import('./components/expenses/expense/expense.component').then(m => m.ExpenseComponent) },

    ],
  },
];
