import { Injectable } from '@angular/core';
import { User } from '../../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  user!: User;

  constructor() { }

  setUser(user: User) {
    this.user = user;
  }

  getUser(): User {
    return this.user;
  }

  isLoggedIn(): boolean {
    if (this.user) {
      return true;
    }
    return false;
  }
}
