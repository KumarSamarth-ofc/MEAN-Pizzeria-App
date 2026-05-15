import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Cart {
  private apiUrl = environment.apiUrl + '/cart';

  cart = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
    this.loadCart();
  }

  loadCart() {
    this.http.get<any>(this.apiUrl).subscribe((cart) => this.cart.next(cart));
  }

  addToCart(pizzaId: string, toppings: string[], quantity: number) {
    return this.http
      .post<any>(this.apiUrl + '/add', { pizzaId, toppings, quantity })
      .pipe(tap((cart) => this.cart.next(cart)));
  }
  updateItem(itemId: string, quantity: number) {
    return this.http
      .put<any>(`${this.apiUrl}/item/${itemId}`, { quantity })
      .pipe(tap((cart) => this.cart.next(cart)));
  }
  removeItem(itemId: string) {
    return this.http
      .delete<any>(`${this.apiUrl}/item/${itemId}`)
      .pipe(tap((cart) => this.cart.next(cart)));
  }
  clearCart() {
    return this.http.delete<any>(this.apiUrl).pipe(tap(() => this.cart.next({ items: [] })));
  }
}
