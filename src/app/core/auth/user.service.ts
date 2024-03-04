import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Register } from '../../shared/models/register';
import { LoaderService } from '../../shared/services/loader.service';

const AUTH_API = "http://localhost:8080/api/v1/users";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private loaderService = inject(LoaderService);

  constructor(private http: HttpClient) { }

  register(user: Register): Observable<any> {
    console.log("register(): user = ", JSON.stringify(user));
    const response = this.http.post(
      AUTH_API,
      JSON.stringify(user),
      httpOptions
    );

    return this.loaderService.showLoadingUntilCompleted(response);
  }

}
