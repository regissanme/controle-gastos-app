import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { StorageService } from '../../core/auth/storage.service';
import { User } from '../shared/models/user';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  user?: User;

  constructor(
    private storageService: StorageService,
    private router: Router
  ) { }


  ngOnInit(): void {
    console.log('dashboard on init - logged in: ', this.storageService.isLoggedIn());
    if (!this.storageService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      this.user = this.storageService.getUser();
    }
  }

}
