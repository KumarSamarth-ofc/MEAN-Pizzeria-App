import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private authUrl = environment.apiUrl + '/auth';
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  authStatus = this.loggedIn.asObservable();

  constructor(private http: HttpClient) { }
  
  register(userData: any) {
    return this.http.post(this.authUrl + '/register', userData);
  }

  login(credentials: any) {
    return this.http.post<{ token: string }>(this.authUrl + '/login', credentials).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        this.loggedIn.next(true);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}
