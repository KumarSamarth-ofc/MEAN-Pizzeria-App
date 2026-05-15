import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class Order {
  private apiUrl = environment.apiUrl + '/orders';

  constructor(private http: HttpClient) {}

  checkout(orderData: any) {
    return this.http.post(this.apiUrl, orderData);
  }

  getMyOrders() {
    return this.http.get<any[]>(this.apiUrl + '/myorders');
  }

  getAllOrders() {
    return this.http.get<any[]>(this.apiUrl);
  }
}
