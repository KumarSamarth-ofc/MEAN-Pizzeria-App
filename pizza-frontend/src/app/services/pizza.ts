import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments';


@Injectable({
  providedIn:'root'
})
  
  
export class Pizza {
  private apiUrl = environment.apiUrl + '/pizzas';
  constructor(private http: HttpClient) {}
  getPizzas(categoryId?: string) {
    let url = this.apiUrl;
    if (categoryId) {
      url += `?category=${categoryId}`;
    }
    return this.http.get<any[]>(url);
  }


  getPizza(id: string) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
