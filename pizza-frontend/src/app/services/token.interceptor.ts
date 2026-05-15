import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Auth } from './auth';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {


    constructor(private auth: Auth) { }

    
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = localStorage.getItem('token');
        if (token) {
            const cloned = req.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
            });
            return next.handle(cloned);
        }
        return next.handle(req);
    }
}