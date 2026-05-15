import { Routes,RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


import { Home } from './components/home/home';
import { BuildPizza } from './components/build-pizza/build-pizza';
import { Cart } from './components/cart/cart';
import { Checkout } from './components/checkout/checkout';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
// import { PizzaDetail } from './components/pizza-detail/pizzadetail';


import { AuthGuard } from './guards/auth-guard';


export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: Home },
    // { path: 'pizza/:id', component: PizzaDetailComponent },
    { path: 'build-pizza', component: BuildPizza, canActivate:
    [AuthGuard] },
    { path: 'cart', component: Cart, canActivate: [AuthGuard] },
    { path: 'checkout', component: Checkout, canActivate: [AuthGuard] },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    // Admin routes could be added, e.g. { path: 'admin', component:
    // AdminComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } }
    { path: '**', redirectTo: '/home' }

];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }