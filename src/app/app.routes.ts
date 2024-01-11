import { Routes } from '@angular/router';
import { HomePageComponent } from './public/home-page/home-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'login', loadComponent: () => import('./core/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./core/register/register.component').then(m => m.RegisterComponent) },
  { path: 'dashboard', loadComponent: () => import('./domain/components/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: '**', loadComponent: () => import('./public/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent) }
];
