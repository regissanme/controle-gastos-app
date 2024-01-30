import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentType } from '../models/payment-type';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  API_URL = "http://localhost:8080/api/v1/pagamento/tipo";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient,) { }

  getAll(): Observable<PaymentType[]> {

    return this.http.get<PaymentType[]>(
      this.API_URL,
      this.httpOptions
    );
  }

}